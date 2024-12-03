import { ChangeEvent, FormEvent, useState } from "react"
import { useTodo } from "../context/TodoContext";

export const AddToDo:React.FC = () => {

    const [todoText,setTodoText] = useState<string>('');

    const { addTodo } = useTodo();    

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    }

    const handleOnSubmit = (e:FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        addTodo(todoText);

        // Clear the input field
        setTodoText('');
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" value={todoText} placeholder="Add your todo" onChange={handleOnChange} />
            <button type="submit">Add</button>
        </form>
    )
}
