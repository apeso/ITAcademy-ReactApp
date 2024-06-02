import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops! Page Not Found</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to="/" className="home-link">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;