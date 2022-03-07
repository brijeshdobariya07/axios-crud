import React, { useState, useEffect } from "react";
import axios from "axios";

const MainContainer = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios
      .get("https://62207dfdce99a7de195b3ec5.mockapi.io/data")
      .then((res) => setUserData(res.data));
  }, []);

  const getData = (e) => {
    e.preventDefault();
    axios
      .get("https://62207dfdce99a7de195b3ec5.mockapi.io/data/" + id)
      .then((res) => setUserData([res.data]))
      .catch((err) => alert(err));
  };

  const editData = (e) => {
    e.preventDefault();
    axios
      .put("https://62207dfdce99a7de195b3ec5.mockapi.io/data/" + id, {
        username,
        password,
        age,
      })
      .then((res) => window.location.reload())
      .catch((err) => alert(err));
  };

  const addData = (e) => {
    e.preventDefault();
    axios
      .post("https://62207dfdce99a7de195b3ec5.mockapi.io/data", {
        username,
        password,
        age,
      })
      .then((res) => window.location.reload())
      .catch((err) => alert(err));
  };

  const deleteData = (e) => {
    e.preventDefault();
    axios
      .delete(`https://62207dfdce99a7de195b3ec5.mockapi.io/data/${id}`)
      .then((res) => window.location.reload())
      .catch((err) => alert(err));
  };

  //   const localFetch = () => {
  //     localStorage.setItem(1, { name: "br", age: 19 });
  //     console.log(localStorage.getItem(1).name);
  //   };
  //   localFetch();

  return (
    <div>
      <div>
        <form action="">
          <label htmlFor="iddata">
            Id:
            <input type="number" onChange={(e) => setId(e.target.value)} />
          </label>
          <br />
          <label htmlFor="name">
            Name :
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <br />
          <label htmlFor="password">
            Password :
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="age">
            Age:
            <input type="number" onChange={(e) => setAge(e.target.value)} />
          </label>

          <br />
          <button type="submit" onClick={(e) => getData(e)}>
            GET
          </button>

          <button type="submit" onClick={(e) => editData(e)}>
            EDIT
          </button>
          <button type="submit" onClick={(e) => addData(e)}>
            ADD
          </button>
          <button type="submit" onClick={(e) => deleteData(e)}>
            DELETE
          </button>
        </form>
      </div>
      <div className="display">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>UserName</th>
              <th>Password</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>{item.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainContainer;
