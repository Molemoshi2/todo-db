import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './Registration.jsx'
import Home from './Home.jsx'
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom'
import LogIn from './Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LogIn/>
  },
  {
    path: '/Register',
    element: <Register/>
  },
  {
    path: '/Home',
    element: <Home/>
  },
  {
    path: '/login',
    element: <LogIn/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
