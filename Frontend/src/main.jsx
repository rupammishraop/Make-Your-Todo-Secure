import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Home, App, Protected, AuthPage, ForgotPasswordPage, AdminDashboard, UserDashboard } from "./index.js"
import store from "./store/userStore.js"
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/auth",
//         element: (
//           <Protected authentication={false}>
//             <AuthPage />
//           </Protected>
//         ),
//       },

//     ],
//   },
// ])
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='auth' element={<AuthPage />} />
      <Route path='admin' element={<AdminDashboard />} />
      <Route path='user' element={
        <Protected >
          <UserDashboard />
        </Protected>

      } />
      <Route path='/auth/forgatepass' element={<ForgotPasswordPage />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
