import { createBrowserRouter, RouterProvider} from "react-router-dom";

import './App.css'
import ResetPassword from "./ResetPassword";
import WelcomePage from "./WelcomePage";

function App(){
    const router = createBrowserRouter([
        {
            path: '/',
            element: <WelcomePage/>
        },
        {
            path: '/reset-password/:token',
            element: <ResetPassword/>
        }
    ])
    return(
        <RouterProvider router={router} />
    )
}

export default App;