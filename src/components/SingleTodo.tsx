import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model"
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from "react-beautiful-dnd";

// styles 
import './styles.css';

type Props = {
  todo: Todo;
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number
}

export const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, todo: editTodo } : todo
    )))
    setEdit(false);
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const handleDone = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo ))
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} 
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {
            edit ? (
              <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text"/>
            ) : todo.isDone ? (
              <s className="todos__single--text">{todo.todo}</s>
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span className="icon" 
              onClick={() => {
                if(!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit /></span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete /></span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone /></span>
          </div>
        </form>
      )}
    </Draggable>
  )
}
