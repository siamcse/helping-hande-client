import { createBrowserRouter } from "react-router-dom";
import AddEvents from "../components/AddEvents/AddEvents";
import AddVolunteers from "../components/AddVolunteers/AddVolunteers";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Home from "../components/Shared/Navbar/Home/Home";
import VolunteerList from "../components/VolunteerList/VolunteerList";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addvolunteer/:id',
                element: <PrivateRoute><AddVolunteers></AddVolunteers></PrivateRoute>,
                loader: ({ params }) => fetch(`https://helping-hand-server.vercel.app/event/${params.id}`)

            },
            {
                path: '/addevents',
                element: <AddEvents></AddEvents>
            },
            {
                path: '/volunteerList',
                element: <PrivateRoute><VolunteerList></VolunteerList></PrivateRoute>
            }

        ]
    }
])