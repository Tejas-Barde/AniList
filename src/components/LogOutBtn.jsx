import { useDispatch } from "react-redux"
import Button from "./Button";
import { logout } from "../store/authSlice";
import auth from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LogOutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = ()=>{
    auth
      .logout()
      .then(response=>{
        dispatch(logout())
        navigate("/")
      })
  }
  return (
    <Button onClick = {logoutHandler} className="bg-blue-400 text-black px-3 py-1 rounded-md" type="button" >
      LogOut
    </Button>
  )
}

export default LogOutBtn
