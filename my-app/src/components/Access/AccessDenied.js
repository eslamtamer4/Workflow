import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <Link to="/">
        <button>Go to Login</button>
      </Link>
    </div>
  );
};

export default AccessDenied;
