import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";

// setting up data to be set
const Newpost = () => {
  const [user, setUser] = useState({});
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //fetching current user data to be used
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("http://localhost:8000/currentUser");
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  // creates a new post and updates the user's information at localhost:8000/users, adding error handling using promises, then navigates to the dashboard
  const handleSubmit = () => {
    const newPost = {
      id: user.userposts ? user.userposts.length + 1 : 1,
      text: postText,
    };
    const updatedUser = {
      ...user,
      userposts: user.userposts ? [...user.userposts, newPost] : [newPost],
      newuserposts: user.newuserposts
        ? [...user.newuserposts, newPost]
        : [newPost],
    };

    const updateUserPromise = fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const updatedCurrentUser = {
      ...user,
      userposts: user.userposts ? [...user.userposts, newPost] : [newPost],
    };

    const updateCurrentUserPromise = fetch(
      "http://localhost:8000/currentUser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentUser),
      }
    );

    Promise.all([updateUserPromise, updateCurrentUserPromise])
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section className="profilegreeting">
        <Welcome user={user} setUser={setUser} />
      </section>
      <div className="postdec">
        <img id="profilepicdash" src={user.profilepicture}></img>
        <p>
          Creating a new post as{" "}
          {user && user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : "loading..."}
        </p>

        <section className="newpostcontent">
          <p id="newpostform">Create a new post:</p> <br />
          <textarea
            placeholder="What's on your mind?"
            id="newposttext"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <button type="submit" id="subbtn" onClick={handleSubmit}>
            Submit post
          </button>
        </section>
      </div>
    </main>
  );
};

export default Newpost;
