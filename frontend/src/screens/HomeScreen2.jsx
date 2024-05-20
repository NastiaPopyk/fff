import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import listProducts from "../store/Slices/Product/ProductFunctions";
import { getAllCategoriesList } from "../network/endpoints/Products";

import { Row, Col, Container, Image, Button } from "react-bootstrap";

import { Link } from 'react-router-dom'; // Додайте цей рядок

const HomeScreen2 = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  if (userInfo) {
    navigate("/explore");
  }
  useEffect(() => {
    const fetchData = async () => {
      dispatch(toggleLoading(true));
      await listProducts();
      await getAllCategoriesList();
      dispatch(toggleLoading(false));
    };
    fetchData();
  }, [dispatch]);
  
  return (
    <div className="page-screen">
      
<div class="video-bg">
    <video src="src/assets/bg.mp4" type="video/mp4" autoPlay muted loop></video>
</div>
<Row className="video-row mt-4 mb-4">
  <Col>

<div class="video-block" id="video1">
        <video src="src/assets/vid1.mp4" type="video/mp4" autoPlay muted loop></video>
        <div class="video-content">
            <h1>Professional</h1>
            <Link className="link-color-black" to="/register">
            <h3>Explore</h3>
              </Link>
        </div>
    </div>
</Col>
<Col>
<div class="video-block">
        <video src="src/assets/vid2.mp4" type="video/mp4" autoPlay muted loop></video>
        <div class="video-content">
            <h1>Customer</h1>
            <Link className="link-color-black" to="/register2">
           <h3>Explore</h3>
              </Link>
        </div>
    </div>
</Col>
      </Row>
     
 
        
     
{/* 
<div class="container">

    <div class="video-block" id="video1">
        <video src="src/assets/vid1.mp4" type="video/mp4" autoplay muted loop></video>
        <div class="video-content">
            <h2>Professional</h2>
            <Link className="link-color-black" to="/login">
            Explore
              </Link>
        </div>
    </div>

    <div class="video-block">
        <video src="src/assets/vid2.mp4" type="video/mp4" autoplay muted loop></video>
        <div class="video-content">
            <h2>Customer</h2>
            <a class="btn" asp-area="Identity" asp-page="/Account/Register">Explore</a>
        </div>
    </div>
</div> */}

        
      
    </div>
  );
};

export default HomeScreen2;
