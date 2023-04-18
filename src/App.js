import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Photos from "./components/Photos";
import Newpost from './components/Newpost';
import Newpic from "./components/Newpic";

function App() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              setUser={setUser}
              userPosts={userPosts}
              setUserPosts={setUserPosts}
            />
          }
        />
        <Route path="/photos" element={<Photos />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newpost" element={<Newpost />} />
        <Route path="/newpic" element={<Newpic />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
