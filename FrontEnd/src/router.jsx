import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
const router=createBrowserRouter([
        {
            path:"/",
            element:<App />,
            children:[
                {
                    index:true,
                    element:<Home/>
                },
                {
                    path:"Login",
                    element:<Login/>
                },
                {
                    path:"Signup",
                    element:<Signup/>
                },
            ]
        }
])


export default router