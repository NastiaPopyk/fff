import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { userLogout } from '../store/Slices/User/UserSlice';
import { orderDetailsReset } from '../store/Slices/AllOrders/AllOrdersSlice';
import { allUsersReset } from '../store/Slices/AllUsers/AllUsersSlice';
import {
  resetCartItems,
  resetShippingAddress,
} from '../store/Slices/Cart/CartSlice';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../store/Slices/App/AppSlice';
import { userRegisterRemove } from '../store/Slices/UserRegister/UserRegister';
import { BsInfoCircle } from 'react-icons/bs';
import { BsPersonCircle } from 'react-icons/bs';



const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(toggleLoading(true));
    dispatch(userLogout());
    dispatch(userRegisterRemove());
    dispatch(resetCartItems());
    dispatch(resetShippingAddress());
    dispatch(orderDetailsReset());
    dispatch(allUsersReset());
    setTimeout(() => dispatch(toggleLoading(false)), 2000);
  };


  return (
    <header className="header" style={{ backgroundColor: 'white' }}>
      <Container>
        <Row>
          
          <Col md>
            {userInfo ? (
              <div className="d-flex justify-content-center align-items-center mt-2" style={{ color: 'black' }}>
                <NavDropdown title={<BsPersonCircle />} id="navbarScrollingDropdown">
                  <LinkContainer className="my-3" to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className="my-2" onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer className="my-2" to="/admin/allusers">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer className="my-2" to="/admin/allproducts">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer className="my-2" to="/admin/allorders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                </NavDropdown>
              </div>
            ) : (
              <></>
            )}
          </Col>
          <Col md>
            <div className="d-flex justify-content-center align-items-center text-center ">
              <img src="src/assets/logo2.jpg" alt="" style={{ width: '200px' }} />
            </div>
          </Col>
          <Col md className="d-flex justify-content-center align-items-center mt-2">
            {userInfo ? (
              <Link className="link-color-black" to="/profile">
                Signed in as: {userInfo.name}
              </Link>
            ) : (
              <Link className="link-color-black" to="/login">
                Login/Register
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
