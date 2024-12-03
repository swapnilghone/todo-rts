import React from "react";
import { TodoType, useTodo } from "../context/TodoContext";
import { useSearchParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

export const ListToDo = () => {
    
    const { Todos, toggleTodoStatus, deleteTodo } = useTodo();

    const handleStatusToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
        toggleTodoStatus(e.target.value);
    }

    const [searchParams] = useSearchParams();

    let filterData:TodoType[] = Todos;
    let todoFilter:string | null = searchParams.get("todo");

    if(todoFilter === 'active'){
        filterData = Todos.filter((todo:TodoType) => {
            return todo.completed === false;
        })
    }

    if(todoFilter === 'completed'){
        filterData = Todos.filter((todo:TodoType) => {
            return todo.completed === true;
        })
    }

    return (
        <>
            {filterData.length === 0 && <div>No Todo's yet!</div>}
            <ul className="main-task">
                {
                    filterData && filterData.map((todo:TodoType) => {
                        return (
                            <li key={todo.id}>
                                <input type="checkbox" id={`todo-${todo.id}`} onChange={handleStatusToggle} checked={todo.completed} value={todo.id}/>
                                <label htmlFor={`todo-${todo.id}`}> { todo.completed ? (<del>{todo.title}</del>):todo.title }</label>
                                <div className="del">
                                    {todo.completed && (<a onClick={()=>{ deleteTodo(todo.id)}}> <FaTrashAlt  /></a>) }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}
