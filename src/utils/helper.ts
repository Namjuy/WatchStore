import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../middlewares/userLoginSlice";


export function useCheckLogin() {
  const userLogin = useSelector(state => state.userLogin);
    const navigate = useNavigate();

    useEffect(() => {
        const usernameLocalStorage = localStorage.getItem('username');
        const passwordLocalStorage = localStorage.getItem('password');
         
        if (!userLogin?.username && !usernameLocalStorage && !passwordLocalStorage) {
            navigate('/login')
        }
    }, [userLogin?.username]);
}  


