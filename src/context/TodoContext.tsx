import { ChangeEvent, createContext, ReactNode, useContext, useState } from "react";

export interface TodoType {
    id:string;
    title:string;
    completed:boolean;
    createdAt: Date;
}

export interface TodoContextType {
    todos:TodoType[];
    addTodo: (todoText: string ) => void;
    toggleTodoStatus: (todoId: string) => void;
    deleteTodo: (todoId:string) => void;
}

export interface TodoProviderProps {
    children: ReactNode
}

// create context
export const TodoContext = createContext<TodoContextType | null>(null);

// context provider
export const TodoProvider = ({children}:TodoProviderProps) => {
  
  const [Todos,setTodo] = useState<TodoType[]>(():TodoType[] => {
    try {
        const savedTodo:string = localStorage.getItem("__todos") || "[]";
        return JSON.parse(savedTodo) as TodoType[]
    } catch (error) {
        return []
    }
  });

  const addTodo = (todoText:string) => {

      const todo:TodoType = {
        id:Math.random().toString(),
        title:todoText,
        completed:false,
        createdAt: new Date()
      }
      const newTodo:TodoType[] = [todo,...Todos];
      setTodo(newTodo)
      localStorage.setItem("__todos",JSON.stringify(newTodo))
  }

  const toggleTodoStatus = (id:string) => {

    const updatedTodos: TodoType[] = Todos.map((currEle: TodoType)=>{
        if(currEle.id === id){
          return {...currEle,completed:!currEle.completed}
          // currEle.completed = !currEle.completed;
        }
        return currEle;
    });
    
    setTodo(updatedTodos);
    localStorage.setItem("__todos",JSON.stringify(updatedTodos))
  }

  const deleteTodo = (id:string) => {

      const newTodo: TodoType[] = Todos.filter((currEle:TodoType) => {
          if( currEle.id !== id )
            return currEle;
      })

      setTodo(newTodo);
      localStorage.setItem("__todos",JSON.stringify(newTodo))
  }


  return (
    <TodoContext.Provider value={{Todos,addTodo,toggleTodoStatus,deleteTodo}}>
        {children}
    </TodoContext.Provider>
  )
}

// use context
export const useTodo: () => TodoContextType | null = () => {

  const todosConsumer = useContext(TodoContext);

  if(!todosConsumer){
      throw new Error("useTodos used outside of Provider");
  };

  return todosConsumer
}