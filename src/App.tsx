import './App.css'
import { AddToDo } from './components/AddToDo'
import { ListToDo } from './components/ListToDo';
import { Navigation } from './components/Navigation';
import { RiTodoLine } from "react-icons/ri";

function App() {

  return (
    <main>
      <div className="container">
        <h1><RiTodoLine />TODO - React + TypeScript <RiTodoLine /></h1>
        <Navigation />
        <AddToDo />
        <ListToDo />
      </div>
    </main>
  )
}

export default App
