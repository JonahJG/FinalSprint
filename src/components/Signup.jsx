import { useState } from "react";
import { useNavigate } from "react-router-dom";

// setting all the variables for the new user to be used later
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profilepicture, setProfilepicture] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [relationship, setRelationship] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  // adding the new user data to the json file, with error handling and verification of password, then navigating to the sign in page when the submit is successful
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const data = {
      email,
      password,
      firstname,
      lastname,
      profilepicture,
      age,
      gender,
      birthday,
      job,
      city,
      province,
      country,
      relationship,
      bio,
    };
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("User created successfully");
        navigate("/");
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // sign up form
  return (
    <div className="signupform">
      <h2 className="signuptext">Sign up for a myfaceconnect account</h2>
      <form onSubmit={handleSubmit}>
        <section className="requiredfields">
          <label>Enter your first name:</label>
          <input
            type="text"
            value={firstname}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your last name:</label>
          <input
            type="text"
            value={lastname}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Upload your profile picture (URL):</label>
          <input
            type="text"
            value={profilepicture}
            required
            onChange={(e) => setProfilepicture(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your age: </label>
          <input
            type="text"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your gender: </label>
          <input
            type="text"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your birthdate (MM-DD-YYYY) </label>
          <input
            type="text"
            value={birthday}
            required
            onChange={(e) => setBirthday(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your occupation: </label>
          <input
            type="text"
            value={job}
            required
            onChange={(e) => setJob(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your city </label>
          <input
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your state/province: </label>
          <input
            type="text"
            value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your country: </label>
          <input
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Enter your relationship status: </label>
          <input
            type="text"
            value={relationship}
            required
            onChange={(e) => setRelationship(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Tell us a few things about yourself: </label>
          <input
            type="text"
            value={bio}
            required
            onChange={(e) => setBio(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <section className="requiredfields">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </section>

        <button className="signinbutton" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
