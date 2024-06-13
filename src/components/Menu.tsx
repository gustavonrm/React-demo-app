import React from 'react';
import { useLocation } from 'react-router-dom';

function Menu() {
  const { pathname } = useLocation();

  const navItems = [
    { path: '/posts', label: 'Posts' },
    { path: '/comments', label: 'Comments' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {navItems.map(({ path, label }) => (
            <li key={path} className={pathname === path ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link pl-0 pr-3" href={path}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
