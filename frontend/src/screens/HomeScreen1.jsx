import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import listProducts from "../store/Slices/Product/ProductFunctions";
import { getAllCategoriesList } from "../network/endpoints/Products";
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import HomeScreen2 from "../screens/HomeScreen2";

const HomeScreen1 = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

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
    
            
        
                 <Container fluid>
      <div className="video-bg">
        <video className="video" src="src/assets/bg.mp4" type="video/mp4" autoPlay muted loop></video>
        <div className="text-overlay">
          <div className="text-center mt-5">
            <h1 className="display-2 font-weight-bold">LEADING ONLINE STORE FOR COSMETOLOGIST WE SELL BEAUTY</h1>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
              {userInfo ? (
                <div className="button-container">

                <Link className="link-color-black important-link" to="/home">
                    Shop
                </Link> 
              </div>
              ) : (
                <Link className="link-color-black important-link" to="/explore">
                    Explore
                </Link> 
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>

    </div>
  );
};

export default HomeScreen1;
