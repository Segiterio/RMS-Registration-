
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ steps }) => {
  return (
    <div className="sidebar">
      {steps.map((step, index) => (
        <NavLink
          key={index}
          to={step.path}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-icon">{index + 1}</div>
          <div className="sidebar-text">{step.name}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;