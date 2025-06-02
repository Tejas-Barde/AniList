import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import SearchPage from './pages/SearchPage.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import LoginPage from './pages/LoginPage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import UserPage from './pages/UserPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/search/:slug",
        element: <SearchPage />
      },
      {
        path: "/login",
        element: <AuthLayout authentication = {false}>
                    <LoginPage />
                  </AuthLayout>
      },
      {
        path: "/signup",
        element: <AuthLayout authentication = {false}>
                    <SignUpPage />
                  </AuthLayout>
      },
      {
        path: "/userpage",
        element:<AuthLayout authentication = {true}>
          <UserPage></UserPage>
        </AuthLayout>
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
