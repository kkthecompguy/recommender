import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              <i data-feather="home"></i>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <span data-feather="file"></span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mentors" className="nav-link">
              <span data-feather="users"></span>
              Mentors
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/institutions" className="nav-link">
              <span data-feather="users"></span>
              Institutions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/students" className="nav-link">
              <span data-feather="bar-chart-2"></span>
              Students
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/matches" className="nav-link">
              <span data-feather="layers"></span>
              Match
            </Link>
          </li>
        </ul>

        
      </div>
    </nav>
  )
}

export default Sidebar;