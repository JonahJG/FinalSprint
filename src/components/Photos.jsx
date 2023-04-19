import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Welcome from "./Welcome";

const Photos = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserPhotos, setCurrentUserPhotos] = useState([]);
  const navigate = useNavigate();

  // fetching current user's photos
  useEffect(() => {
    fetch("http://localhost:8000/currentUser")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        const currentUser = data || {};
        const currentUserPhotos = data.userphotos || [];
        setCurrentUserPhotos(currentUserPhotos);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <section className="profilegreeting">
        <Welcome user={currentUser} setUser={setCurrentUser} />
      </section>
      {/* displaying the user's photos in a gallery */}
      <div className="container">
        {currentUserPhotos.length > 0 ? (
          currentUserPhotos.map((photo) => (
            <img
              src={photo.url}
              alt={`Current User Photo ${photo.id}`}
              key={`currentUserPhoto-${photo.id}`}
            />
          ))
        ) : (
          <p>No photos found.</p>
        )}
      </div>
    </main>
  );
};

export default Photos;
