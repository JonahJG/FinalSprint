import { useState, useEffect } from "react";
import React from "react";
import Welcome from "./Welcome";

const Profile = () => {
  const [user, setUser] = useState({});

  // fetching the user's data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/currentUser`);
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      {/* calling the welcome function which displays the user's profile picture, name, and a greeting */}
      <section className="profilegreeting">
        <Welcome user={user} setUser={setUser} />
      </section>

      {/* displaying the user's profile with error handling */}
      <p id="profileinfo">
        <span className="infotext">Name:</span>
        {user.firstname && user.lastname
          ? ` ${user.firstname} ${user.lastname}`
          : "loading..."}
        <br /> <span className="infotext">Age:</span>{" "}
        {user.age ? ` ${user.age} ` : "loading..."} <br />
        <span className="infotext">Birthday:</span>{" "}
        {user.birthday ? ` ${user.birthday} ` : "loading..."}
        <br /> <span className="infotext">Works at:</span>{" "}
        {user.job ? ` ${user.job} ` : "loading..."}
        <br /> <span className="infotext">Gender identity:</span>{" "}
        {user.gender ? ` ${user.gender} ` : "loading..."}
        <br /> <span className="infotext">Lives in:</span>
        {user.city && user.province && user.country
          ? ` ${user.city}, ${user.province}, ${user.country} `
          : "loading..."}
        <br /> <span className="infotext">Relationship status:</span>
        {user.relationship ? ` ${user.relationship} ` : "loading..."}
        <br />
        <br />
        <span className="infotext">Bio:</span> <br /> <br />
        {user.bio ? ` ${user.bio} ` : "loading..."}
      </p>
    </main>
  );
};

export default Profile;
