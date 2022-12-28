import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { setUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth , (user)=>{
      if(user){
        dispatch(setUser(user.email))
      }else{
        dispatch(toggleLoading())
      }
    })
  },[])

  return (
    <>
    <Toaster
    position="top-center"
    reverseOrder={false}
  />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
