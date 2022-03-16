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

  const deleteUser = (id, index) => {
    axios
      .delete(`https://62207dfdce99a7de195b3ec5.mockapi.io/userdata/${id}`)
      .then((res) => {
        // const findId = userData.findIndex((user) => user.id === res.data.id);
        // Alwayts Use Index of map object for array operations
        let deleteData = [...userData];
        deleteData.splice(index, 1);
        setUserData(deleteData);
      })
      .catch((err) => alert("Failed To Delete User"));
  };

  const editUser = (user) => {
    navigate("/add", { state: { user, edit: true } });
  };

  const handleAddBtn = () => {
    navigate("/add");
  };

  return (
    <div className="user-data-container">
      <div>
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
              {userData.map((user, index) => {
                const { id, name, age, gender, hobbies, address } = user || "";

                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{gender}</td>

                    <td>
                      {hobbies.map((item, i) => {
                        const lastIndex = hobbies.length - 1;
                        if (i === lastIndex) {
                          return `${item}`;
                        } else {
                          return `${item}, `;
                        }
                      })}
                    </td>

                    <td>{address}</td>

                    <td>
                      <FiEdit
                        className="edit-icon"
                        onClick={() => editUser(user)}
                      />
                    </td>
                    <td>
                      <FiTrash
                        className="del-icon"
                        onClick={() => deleteUser(id, index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="add-btn">
          <div onClick={handleAddBtn}>Add</div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
