import Login from "./pages/Login"
import { createBrowserRouter, Outlet } from "react-router-dom"
import Signup from "./pages/Signup"

const appRouter = createBrowserRouter([{
  path : "/" ,
  element : <App/>,
  children : [
    {
      path : '/login',
      element: <Login/>
    } ,
    {
      path : '/signup' ,
      element : <Signup/>
    }
  ]
}])

function App() {

  return (
    <>
      <Outlet/>
    </>
  )
}

export default appRouter
