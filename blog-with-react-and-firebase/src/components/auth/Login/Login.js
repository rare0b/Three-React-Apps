import { auth, provider } from "../../../firebase";
import { signInWithRedirect } from "firebase/auth";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../authContainer.css";

const Login = ({ isAuth }) => {
  const loginWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="authContainer">
      <GoogleLoginButton loginWithGoogle={loginWithGoogle} />
    </div>
  );
};

export default Login;
