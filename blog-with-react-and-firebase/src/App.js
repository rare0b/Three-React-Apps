import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/auth/Login/Login";
import Logout from "./components/auth/Logout/Logout";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    } else {
      localStorage.clear();
      setIsAuth(false);
    }
  }, [user, setIsAuth]);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Router>
          <Navbar isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/createpost" element={<CreatePost />}></Route>
            <Route path="/login" element={<Login isAuth={isAuth} />}></Route>
            <Route path="/logout" element={<Logout isAuth={isAuth} />}></Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
