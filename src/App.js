import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Photos from "./components/Photos";
import Newpost from "./components/Newpost";
import Newpic from "./components/Newpic";

function App() {
  const [user, setUser] = useState(null); // Defining an empty state variable for the user
  const [userPosts, setUserPosts] = useState([]); // Defining an empty array as the user's posts to be set later

  // Use the useEffect hook to fetch data, then sending a GET request to store the response in a variable called "response", extract the JSON data and store it in a variable called "data" to set the user's data. Included error handling with a catch block.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/users"); //
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    // Calling fetch data, set it as an empty array so that it only runs once
    fetchUserData();
  }, []);

  return (
    // Render the components inside a Router component
    <Router>
      <Header /> // Render the Header component
      <Routes>
        {" "}
        // Define the routes of the application
        <Route path="/" element={<Login />} /> // Render the Login component for
        the home route
        <Route
          path="/dashboard"
          element={
            // Render the Dashboard component for the dashboard route with props for "user", "setUser", "userPosts", and "setUserPosts"
            <Dashboard
              user={user}
              setUser={setUser}
              userPosts={userPosts}
              setUserPosts={setUserPosts}
            />
          }
        />
        {/* rendering the routes */}
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
