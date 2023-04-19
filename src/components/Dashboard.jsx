import { useState, useEffect } from "react";
import OnClick from "./OnClick"
import ToTop from "./ToTop"
import Welcome from "./Welcome";

const Dashboard = () => {
  // set the user's posts to an empty array, as well as setting the user, and dummy accounts for accessing the dummy posts.
  const [userPosts, setUserPosts] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  const [user, setUser] = useState({});
  const [dummy1, setDummy1] = useState({});
  const [dummy2, setDummy2] = useState({});

// Fetching current user data to use for displaying, with added error handling in case of any issues with fetching the data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/currentUser");
        if (!response.ok) {
          throw new Error("Failed to fetch current user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);


// fetching the dummy profile data to set to dummy1 and dummy1 to use the data to make dummy posts, with error handling
  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response1 = await fetch("http://localhost:8000/dummyuser1");
        const response2 = await fetch("http://localhost:8000/dummyuser2");
        if (!response1.ok || !response2.ok) {
          throw new Error("Failed to fetch dummy data");
        }
        const data1 = await response1.json();
        const data2 = await response2.json();
        setDummy1(data1);
        setDummy2(data2);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDummyData();
  }, []);

  // Checking to see if user.userposts, etc, exist being logging the data
  useEffect(() => {
    if (user.userposts) {
      setUserPosts(user.userposts);
      setUserPhotos(user.userphotos);
      console.log(user.userphotos)
    }
  }, [user]);


return (
    <div>

      {/* Calling the ToTop component to display a return to top button */}
      <section className="totop">
        <ToTop/>
      </section>
      {/* Calling the Welcome component to display the welcome message/links bar, using the current user  */}
      <section className="profilegreeting">
      <Welcome user={user} setUser={setUser} />
      </section>
        <section className="newpostcontainer">
        <section className="newpostlink">
          <a href="/Newpost">Create a new post</a>
        </section>
        <section className="newpostlink">
          <a href="/Newpic">Upload a new picture</a>
        </section>
        </section>


<section className="dummypost">
  <section className="postdec">
    <section className="picandpost">
      {/* Setting the dummy2 profile picture and post, with a check for if they both exist first */}
      {dummy2.profilepicture && <img className="profilepicpost" src={dummy2.profilepicture} alt="Profile" />}
      {dummy2 && dummy2.firstname && dummy2.lastname ? `${dummy2.firstname} ${dummy2.lastname} ` : "loading..."}
      uploaded a new post
    </section>
    {dummy2 && dummy2.userposts && (
      <section className="postcontent">
        {dummy2.userposts.map((post) => (
          <section className="posttextbox" key={post.id}>
            {post.text}
            // Displaying the like button 
            <section className="likebutton1">
            <OnClick/>
            </section>
          </section>
        ))}
      </section>
    )}
  </section>
</section>

 {/* Displaying the profile picture and posts of the current user, checking to see if they exist first.  */}
{userPosts.length > 0 && userPosts.map((post) => (
  post && post.text && (
    <section className="postdec" key={post.id}>
             <section className="picandpost">
             {user.profilepicture && <img className="profilepicpost" src={user.profilepicture} alt="Profile"></img>}
          {user && user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname} `
            : "loading..."}
            uploaded a new post
        </section>
            <section className="postcontent">
          <section key={post.id}>
            <section id="posttextbox">
            <section className="posttextbox">
              {post.text}
              <section className="likebutton">
             <section className="likebutton">
            <OnClick/>
            </section>
             </section>
              </section>
              </section>
              
          </section>
          </section>
          </section>
        )
      ))}

{/* Displaying the profile picture and uploaded pictures of the current user, checking to see if they exist first.  */}
   {userPhotos.length > 0 && (
  userPhotos.map((photo) => (
    <section key={photo.id} className="postdec">
      <section className="picandpost">
        {user.profilepicture && <img className="profilepicpost" src={user.profilepicture} alt="Profile"></img>}
        {user && user.firstname && user.lastname
          ? `${user.firstname} ${user.lastname} `
          : "loading..."}
        uploaded a new photo
      </section>
      <section className="postcontent">
        <section className="postpicbox">
          <section className="newpicdisplay">
            <img src={photo.url} alt="user photo" className="dashpicdis" />
            <section className="likebutton">
            <OnClick/>
            </section>
          </section>
        </section>
      </section>
    </section>
  ))
)}
   {/* Setting the dummy1 profile picture and post, with a check for if they both exist first */}
  <section className="dummypost">
  <section className="postdec">
    <section className="picandpost">
      {dummy1.profilepicture && <img className="profilepicpost" src={dummy1.profilepicture} alt="Profile" />}
      {dummy1 && dummy1.firstname && dummy1.lastname ? `${dummy1.firstname} ${dummy1.lastname} ` : "loading..."}
      uploaded a new post
    </section>
    {dummy1 && dummy1.userposts && (
      <section className="postcontent">
        {dummy1.userposts.map((post) => (
          <section className="posttextbox" key={post.id}>
            {post.text}
            <section className="likebutton1">
            <OnClick/>
            </section>
          </section>
        ))}
      </section>
    )}
  </section>
</section>
    </div>
  );
};

export default Dashboard;
