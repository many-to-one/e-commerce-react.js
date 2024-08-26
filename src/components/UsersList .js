import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve token from cookies

        const response = await axios.get(`${DEV_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });

        setUsers(response.data); // Set users state with fetched data
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if there's an error
  }

  return (
    <div className='auth_base'>
      <h1>Users List</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.username}</strong> - {user.email} - {user.is_active ? 'Active' : 'Inactive'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
