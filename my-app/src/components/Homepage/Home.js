import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log(token)

      try {
        await axios.post("http://127.0.0.1:8000/Authentication/logout/", config) // Call your logout API endpoint
        localStorage.removeItem('token'); // Remove access token
        navigate('/'); // Navigate to the login page
      } catch (error) {
        console.error('Logout failed:', error);
      }
  };

  useEffect(() => {
    console.log(token)
    // Check if the user is logged in
    if (!token) {
      console.log('seif')
      navigate("/Access_Denied");
      return;
    }

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
      <h2 className="home-header">Welcome to the Homepage</h2>
      <p className="home-paragraph">This is the homepage of your application.</p>
      <h2 className="navigate-title">Navigate to Onboarding Requests</h2>
      <button className="navigate-button" onClick={handleNavigateButtonClick}>
        Onboarding Requests
      </button>
      <div className="user-profile">
        <h2 className="user-info">User Profile</h2>
        <p className="user-info">ID: {user.id}</p>
        <p className="user-info">Username: {user.Username}</p>
        <p className="user-info">First Name: {user.Firstname}</p>
        <p className="user-info">Last Name: {user.Lastname}</p>
        <p className="user-info">Email: {user.E_mail}</p>
        <p className="user-info">Is Active: {user.Is_active ? "Yes" : "No"}</p>
        <p className="user-info">Created Date: {user.Created_date}</p>
        <p className="user-info">Modified Date: {user.Modified_date}</p>
        <p className="user-info">Is HR: {user.Is_HR ? "Yes" : "No"}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;