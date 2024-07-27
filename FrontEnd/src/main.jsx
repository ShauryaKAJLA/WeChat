import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import {ToastContainer, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store.js'
import {Provider} from 'react-redux'
import { SocketContextProvider } from './components/Context/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <SocketContextProvider>
         <ToastContainer position="top-right"  autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
         <RouterProvider router={router}/>
      </SocketContextProvider>
   </Provider>

)
