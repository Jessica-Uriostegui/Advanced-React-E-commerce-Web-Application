import {useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from 'react-router-dom'
import { Navbar, Nav, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './UserContext';
import { Cart4 } from 'react-bootstrap-icons';
import './Navbar.css';


function NavigationBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate({ replace: true});
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const[expanded, setExpanded] = useState(false);

  

  const handleToggle = () =>  setExpanded(!expanded);
  const handleSelect = () =>  setExpanded(false);

  const handleLogout = () => {
    logout();
    navigate('/home');
  };
  
  return (
    <Navbar  bg='#e3f2fd' expand= "-sm"  expanded={expanded} onToggle={handleToggle}>
      <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>

      <div className="d-flex align-items-center ms-auto">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user.isLoggedIn && (
          <div className="cart-container" onClick={() => navigate('/Cart')}>
            <Cart4 className ="cart-icon" size="1.5rem"/>
            <Badge className="badge">{totalQuantity}</Badge>
          </div>
        )}
      </div>

      <Navbar.Collapse id="basic-navbar-nav" in={expanded}>
        <Nav className="mx-auto" onSelect={handleSelect}>
          <Nav.Link as={NavLink} to="/" onClick={handleSelect}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" onClick={handleSelect}>
            Products
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Cart" onClick={handleSelect}>
            Cart
          </Nav.Link>
          {user.isLoggedIn ? (
            <Nav.Link as={NavLink} to="/home" onClick={handleLogout}>
              Log Out
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/Register/" onClick={handleSelect}>
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Login" onClick={handleSelect}>
                Log In
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar; 