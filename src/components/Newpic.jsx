import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Welcome from "./Welcome"

const Newpic = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userPictures, setUserPictures] = useState([]);
  const [newUserPictures, setNewUserPictures] = useState([]);
  const [pictureUrl, setPictureUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("http://localhost:8000/currentUser");
        const data = await response.json();
        setUser(data);
        setUserPictures(data.userphotos);
        setNewUserPictures(data.newuserphotos);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pictureUrl) {
      // get the last id in the existing userPhotos array, or set to 0 if the array is empty
      const lastId = userPictures.length ? userPictures[userPictures.length - 1].id : 0;
      // generate a new unique id for the new photo
      const newId = lastId + 1;
  
      // create a new object for the new photo
      const newPhoto = {
        id: newId,
        url: pictureUrl,
      };
  
      // create a new array with the new photo added
      const updatedUserPhotos = [...userPictures, newPhoto];
  
      // create a new array with the new photo added
      const updatedNewUserPhotos = [...newUserPictures, newPhoto];
  
      const updatedUser = {
        ...user,
        userphotos: updatedUserPhotos,
      };
  
      // send the updated user data to both endpoints
      const updateCurrentUserRequest = fetch(`http://localhost:8000/currentUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const updateUserRequest = fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const [updateCurrentUserResponse, updateUserResponse] = await Promise.all([
        updateCurrentUserRequest,
        updateUserRequest,
      ]);
  
      if (!updateCurrentUserResponse.ok || !updateUserResponse.ok) {
        console.error("Failed to update user data");
        // handle error as needed
        return;
      }
  
      const updatedUserData = await updateCurrentUserResponse.json();
      setUser(updatedUserData);
      setUserPictures(updatedUserData.userphotos);
      setNewUserPictures(updatedNewUserPhotos);
      setPictureUrl("");
      navigate("/dashboard");
    }
  };

  return (
    <main>
      <section className="profilegreeting">
      <Welcome user={user} setUser={setUser} />
      </section>
      <div className="picdec">
        <img id="profilepicdash" src={user.profilepicture}></img>
        <p>
          Adding a new picture as{" "}
          {user && user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : "loading..."}
        </p>
        <form onSubmit={handleSubmit}>
          <section className="newpiccontent">
            <label className="enterpic" htmlFor="pictureUrl">Enter picture URL:</label>
            <input
              type="text"
              className="enterpic"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
            <button type="submit" id="subbtn">
              Add Picture
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};

export default Newpic;