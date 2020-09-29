import React from 'react';
import logo from '../../images/logo.png'
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/reviews">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;