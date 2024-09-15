import './App.css';
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
    const router = createBrowserRouter([
        {
            path: "/home",
            element: <Home/>}, {
            path: "/",
            element: <Login/>}, {
            path: "/register",
            element: <Register/>}
    ]);
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
