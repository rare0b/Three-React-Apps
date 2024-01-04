import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Logout.css";
import "./authContainer.css";

const Logout = ({ isAuth }) => {
  const logout = () => {
    signOut(auth);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="authContainer">
      <button className="logoutButton" onClick={logout}>
        ログアウト
      </button>
    </div>
  );
};

export default Logout;
