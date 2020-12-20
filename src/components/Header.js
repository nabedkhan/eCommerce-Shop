import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/actions/userLoginAction';

const Header = () => {
    const { userInfo } = useSelector(state => state.userLoginInfo);
    const dispatch = useDispatch();

    return (
        <Navbar bg="primary" className="navbar-dark" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">E-Commerce Shop</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/cart" className="nav-link">
                            <i className="fas fa-shopping-cart"></i> Cart</Link>
                        {
                            userInfo.email ? (
                                <>
                                    <Link to="/myOrders" className="nav-link">
                                        <i className="fab fa-bitbucket"></i> Orders</Link>
                                    <Nav.Link onClick={() => dispatch(logoutUser())}>
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </Nav.Link>
                                </>
                            ) :
                                <Link to="/login" className="nav-link">
                                    <i className="fas fa-sign-out-alt"></i> Sign In</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;