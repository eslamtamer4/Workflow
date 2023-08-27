import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Fetch user data from the backend API
    axios.get("http://127.0.0.1:8000/Authentication/Get_user/", config)  // Replace with your actual API endpoint
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleNavigateButtonClick = () => {
    if(user.Is_HR){
      navigate("/HR_Onboarding");
    } else{
      navigate("/Sup_Onboarding")
    }
  };


  return (
    <div className="home-container">
      <h2>Welcome to the Homepage</h2>
      <p>This is the homepage of your application.</p>
      <button onClick={handleNavigateButtonClick}>Onboarding Requests</button>
      <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Username: {user.Username}</p>
      <p>First Name: {user.Firstname}</p>
      <p>Last Name: {user.Lastname}</p>
      <p>Email: {user.E_mail}</p>
      <p>Is Active: {user.Is_active ? "Yes" : "No"}</p>
      <p>Created Date: {user.Created_date}</p>
      <p>Modified Date: {user.Modified_date}</p>
      <p>Is HR: {user.Is_HR ? "Yes" : "No"}</p>
    </div>
    </div>
  );
};

export default Home;