import AuthPage from "./components/AuthPage";
import Home from "./components/HomePage";
import Login from "./components/LoginPage";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import App from "./App";
import Footer from "./components/Footer";
import ForgotPasswordPage from "./components/ForgatePass";
import VideoPlayer from "./components/VideoPlayer";
import AdminDashboard from "./components/AdminDashboard ";
import UserDashboard from "./components/UserDashboard"
import Protected from "./components/Protected"
import  {localLogin, localLogout} from "./store/authAction"
import Popup from "./components/PopUp";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";

export {
    AuthPage,
    Home,
    Login,
    Navbar,
    SignUp,
    App,
    Footer,
    ForgotPasswordPage,
    VideoPlayer,
    AdminDashboard,
    UserDashboard,
    Protected,
    localLogin, 
    localLogout,
    AddTodo,
    TodoItems
}