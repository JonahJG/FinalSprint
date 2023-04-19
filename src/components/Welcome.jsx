import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = ({ user = {}, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    //fetching user data
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/currentUser");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setUser(data[0]);
      }
    };
    fetchData();
  }, []);

  // resetting the currentUser data to empty strings so that when they log out, no information from the previous user is retained
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/currentUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "",
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          userposts: "",
          gender: "",
          age: "",
          birthday: "",
          job: "",
          city: "",
          province: "",
          country: "",
          relationship: "",
          bio: "",
          profilepicture: "",
          userphotos: "",
          newuserphotos: "",
          newuserposts: "",
        }),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  // displayng welcome message and links to the other pages, and handling the navigation
  return (
    <div className="welcomebanner">
      <main>
        <section className="profilegreeting">
          {user && user.profilepicture && (
            <img id="profilepic" src={user.profilepicture} />
          )}
          <h2>
            Welcome,{" "}
            {user && user.firstname && user.lastname
              ? `${user.firstname} ${user.lastname}`
              : "loading..."}
          </h2>
        </section>
        <a id="logout" onClick={handleLogout}>
          Log Out
        </a>
        <p className="links">
          <a id="about" onClick={() => navigate("/profile")}>
            About
          </a>
          <a id="photos" onClick={() => navigate("/photos")}>
            Photos
          </a>
          <a id="dashLink" onClick={() => navigate("/dashboard")}>
            Dashboard
          </a>
        </p>
      </main>
    </div>
  );
};

export default Welcome;
