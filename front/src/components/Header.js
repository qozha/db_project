import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to="/overview" className="fw7 mr1 no-underline black">
          Overview
        </Link>
        <div className="ml1">|</div>
        <Link to="/salary" className="ml1 no-underline black">
          Change salary
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          Create Report
        </Link>
        <div className="ml1">|</div>
        <Link to="/register" className="ml1 no-underline black">
          Register a Public Servant
        </Link>
      </div>
    </div>
  );
};

export default Header;
