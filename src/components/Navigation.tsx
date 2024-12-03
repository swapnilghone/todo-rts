import { Link,useSearchParams } from "react-router-dom"

export const Navigation = () => {

  const [searchParams] = useSearchParams();

  let todoFilter:string | null = searchParams.get("todo");

  return (
    <nav>
        <Link to="/" className={todoFilter === null?'active':''}>All</Link>
        <Link to="/?todo=active" className={todoFilter === 'active'?'active':''}>Active</Link>
        <Link to="/?todo=completed" className={todoFilter === 'completed'?'active':''}>Completed</Link>
    </nav>
  )
}