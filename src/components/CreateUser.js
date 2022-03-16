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

  const [validName, setValidName] = useState(true);
  const [valid, setValid] = useState(false);

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
        if (value.length <= 30) {
          setUserData((item) => ({ ...item, name: value }));
          setValidName(true);
        } else {
          setValidName(false);
        }
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
    const isValid = validate();

    if (isValid && isEdit === false) {
      setValid(false);
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
      setValid(true);
      alert("Please Fill all details");
    }
  };

  const { name, age, gender, hobbies, address } = userData;

  const validate = () => {
    if (user && age && gender && hobbies && address) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="create-user-card">
      <div>
        <form action="/">
          <div>
            <h1>{stateEdit ? "Update" : "Add"} User</h1>
          </div>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={(e) => handleData(e)}
                value={name}
              />
              {!validName ? (
                <div className="valid">*Name must be 30 characters only</div>
              ) : null}
              {valid ? (
                <div className="valid">*This field is required</div>
              ) : null}
            </div>
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
              <div className="form__gender">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  onChange={(e) => handleData(e)}
                  value="Male"
                  checked={gender === "Male"}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  onChange={(e) => handleData(e)}
                  value="Female"
                  checked={gender === "Female"}
                />
                <label htmlFor="female">Female</label>
              </div>
              {valid ? (
                <div className="valid">*This field is required</div>
              ) : null}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="hobby">Hobbies</label>
            <div className="form__hobby">
              <div>
                <div>
                  <input
                    type="checkbox"
                    value="Playing"
                    onChange={(e) => handleData(e)}
                    name="hobbies"
                    checked={hobbies.includes("Playing") === true}
                  />
                  <label htmlFor="playing">Playing</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Singing"
                    onChange={(e) => handleData(e)}
                    name="hobbies"
                    checked={hobbies.includes("Singing") === true}
                  />
                  <label htmlFor="singing">Singing</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Reading"
                    onChange={(e) => handleData(e)}
                    name="hobbies"
                    checked={hobbies.includes("Reading") === true}
                  />
                  <label htmlFor="reading">Reading</label>
                </div>
              </div>
              {valid ? (
                <div className="valid">*This field is required</div>
              ) : null}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="address">Address</label>
            <div>
              <textarea
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => handleData(e)}
                value={address}
              ></textarea>
              {valid ? (
                <div className="valid">*This field is required</div>
              ) : null}
            </div>
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
