import Login from "./pages/Login"
import { createBrowserRouter, Outlet } from "react-router-dom"
import Signup from "./pages/Signup"
import Body from "./pages/Body"
import { Provider } from "react-redux"
import store from "./utils/store"
import Blog from "./pages/Blog"
import { Appbar } from "./components/Appbar"
import Publish from "./pages/Publish"

const appRouter = createBrowserRouter([{
  path : "/" ,
  element : <App/>,
  children : [
    {
      path : '/',
      element: <Login/>
    } ,
    {
      path : '/login',
      element: <Login/>
    } ,
    {
      path : '/signup' ,
      element : <Signup/>
    } ,
    {
      path : "/blogs" ,
      element : <Body/>
    } , {
      path : "/blog/:id" ,
      element : <Blog/>
    } , {
      path : '/publish' ,
      element : <Publish/>
    }
  ]
}])

function App() {

  return (
    <>
      <Provider store={store}>
        <Appbar/>
        <Outlet/>
      </Provider>
    </>
  )
}

export default appRouter
