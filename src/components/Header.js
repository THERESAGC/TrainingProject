import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ShopApp
        </Link>
        
        <div className="d-flex justify-content-end">
          <Link to="/user-dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/user-login" className="nav-link">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
