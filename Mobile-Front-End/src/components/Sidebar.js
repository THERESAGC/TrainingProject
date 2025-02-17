import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3" style={{ width: '250px', height: '100vh' }}>
      <h5>Categories</h5>
      <ul className="list-unstyled">
        <li>
          <Link to="/category/1" className="nav-link">Category 1</Link>
        </li>
        <li>
          <Link to="/category/2" className="nav-link">Category 2</Link>
        </li>
        <li>
          <Link to="/category/3" className="nav-link">Category 3</Link>
        </li>
      </ul>
      <h5>Products</h5>
      <ul className="list-unstyled">
        <li>
          <Link to="/products" className="nav-link">All Products</Link>
        </li>
        {/* Add more product links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
