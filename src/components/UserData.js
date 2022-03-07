import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserData() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const getUserData = () => {
    axios
      .get("https://62207dfdce99a7de195b3ec5.mockapi.io/userdata")
      .then((res) => setUserData(res.data))
      .catch((err) => alert("Failed To Get Data"));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://62207dfdce99a7de195b3ec5.mockapi.io/userdata/${id}`)
      .then((res) => {
        const findId = userData.findIndex((user) => user.id === res.data.id);
        let deleteData = [...userData];
        deleteData.splice(findId, 1);
        setUserData(deleteData);
      })
      .catch((err) => alert("Failed To Delete User"));
  };

  const editUser = (user) => {
    navigate("/add", { state: { user, edit: true } });
  };

  return (
    <div>
      <div className="user-data-container">
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Hobbies</th>
                <th>Address</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.hobbies.map((hobby) => `${hobby}, `)}</td>
                    <td>{user.address}</td>
                    <td>
                      <FiEdit
                        className="edit-icon"
                        onClick={() => editUser(user)}
                      />
                    </td>
                    <td>
                      <FiTrash
                        className="del-icon"
                        onClick={() => deleteUser(user.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserData;
