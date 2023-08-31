import React, { useState, useEffect  } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import your CSS file

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Authentication/login/",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-container">

        <div id="card">
          <div id="card-content">
            <div id="card-title">
              <h2>LOGIN</h2>
              <div class="underline-title"></div>
            </div>
            <form method="post" class="form-login" onSubmit={handleSubmit}>
              <label for="user-email" style={{paddingTop: '22px'}}>
                  &nbsp;Email
                </label>
              <input id="user-email" class="form-login-content" type="email" name="email" placeholder="Email" autocomplete="on" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div class="form-login-border"></div>
              <label for="user-password" style={{paddingTop: '22px'}}>&nbsp;Password
                </label>
              <input id="user-password" class="form-login-content" type="password" name="password" required  value={password} onChange={(e) => setPassword(e.target.value)}/>
              <div class="form-login-border"></div>

        <button type="submit" id="submit-btn">
          Login
        </button>
            </form>
          </div>
        </div>
      </div>

  );
};

export default LoginForm;