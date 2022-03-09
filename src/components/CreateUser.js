import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import UserData from "./UserData";

function CreateUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    age: 10,
    gender: "",
    hobbies: [],
    address: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const { state } = useLocation();
  const user = state?.user || userData;
  const stateEdit = state?.edit || false;
  const editUserId = user.id || "";

  useEffect(() => {
    setUserData(user);
    setIsEdit(stateEdit);
  }, [user, stateEdit]);

  const handleData = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setUserData((item) => ({ ...item, name: value }));
        break;

      case "age":
        if (value >= 10 && value <= 100)
          setUserData((item) => ({ ...item, age: value }));
        break;

      case "gender":
        setUserData((item) => ({ ...item, gender: value }));
        break;

      case "hobbies":
        let hobby = new Set([...userData.hobbies]);
        if (hobby.has(value)) {
          hobby.delete(value);
        } else {
          hobby.add(value);
        }
        setUserData((item) => ({ ...item, hobbies: [...hobby] }));
        break;

      case "address":
        setUserData((item) => ({ ...item, address: value }));
        break;
      default:
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, gender, hobbies, address } = userData;

    if (name && age && gender && hobbies && address && isEdit === false) {
      axios
        .post("https://62207dfdce99a7de195b3ec5.mockapi.io/userdata", userData)
        .then((res) => navigate("/"))
        .catch((err) => alert("Error Ocurred"));
    } else if (isEdit) {
      axios
        .put(
          `https://62207dfdce99a7de195b3ec5.mockapi.io/userdata/${editUserId}`,
          userData
        )
        .then((res) => navigate("/"))
        .catch((err) => alert("error occured"));
    } else {
      alert("Please Fill all details");
    }
  };

  let { name, age, gender, hobbies, address } = userData;

  return (
    <div>
      <div className="create-user-card">
        <form action="/">
          <div>
            <h1>Add User</h1>
          </div>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={(e) => handleData(e)}
              value={name}
            />
          </div>
          <div className="form-field">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              onChange={(e) => handleData(e)}
              value={age}
            />
          </div>
          <div className="form-field">
            <label htmlFor="Gender">Gender</label>
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                name="gender"
                onChange={(e) => handleData(e)}
                value="Male"
                checked={gender === "Male"}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                name="gender"
                onChange={(e) => handleData(e)}
                value="Female"
                checked={gender === "Female"}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="hobby">Hobbies</label>
            <div>
              <div>
                <label htmlFor="playing">Playing</label>
                <input
                  type="checkbox"
                  value="Playing"
                  onChange={(e) => handleData(e)}
                  name="hobbies"
                  checked={hobbies.includes("Playing") === true}
                />
              </div>
              <div>
                <label htmlFor="singing">Singing</label>
                <input
                  type="checkbox"
                  value="Singing"
                  onChange={(e) => handleData(e)}
                  name="hobbies"
                  checked={hobbies.includes("Singing") === true}
                />
              </div>
              <div>
                <label htmlFor="reading">Reading</label>
                <input
                  type="checkbox"
                  value="Reading"
                  onChange={(e) => handleData(e)}
                  name="hobbies"
                  checked={hobbies.includes("Reading") === true}
                />
              </div>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              placeholder="Address"
              name="address"
              onChange={(e) => handleData(e)}
              value={address}
            ></textarea>
          </div>
          <div className="btn">
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
