import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import SearchPage from './pages/SearchPage.jsx'
import { Provider } from 'react-redux'
import store from './store/store'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App></App>,
    children : [
      {
        path : "/",
        element : <Home/>
      }
      ,{
        path : "/search/:slug",
        element : <SearchPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>

    </Provider>
  </StrictMode>,
)
