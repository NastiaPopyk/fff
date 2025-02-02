import { useEffect, useState } from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Product from "../components/Product";
import Loader from "../components/loader";
import Toastify from "../components/Toastify";
import listProducts from "../store/Slices/Product/ProductFunctions";
import ErrorImage from "../assets/ErrorBadRequest.svg";
import { AiFillCar } from "react-icons/ai";
import { RiMoneyDollarCircleLine, Ri24HoursFill } from "react-icons/ri";
import HomeProductCard from "../components/HomeProductCard";
import { getAllCategoriesList } from "../network/endpoints/Products";
import { FaCartArrowDown } from "react-icons/fa";

const HomeScreen = () => {
  const [allCategories, setAllCategories] = useState([]);
  const { products, error } = useSelector((state) => state.productList);
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const Load = async () => {
    await getAllCategoriesList().then((response) => {
      setAllCategories(response.data);
    });
    await listProducts(dispatch, "All");
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 500);
  };

  const getCategory = async (category) => {
    dispatch(toggleLoading(true));
    await listProducts(dispatch, category);
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 2000);
  };

  useEffect(() => {
    dispatch(toggleLoading(true));
    Load();
  }, []);

  return (
    <div className="page-screen">
      {app.isLoading ? (
        <Loader />
      ) : error ? (
        <>
          {Toastify(error, "error")}
          <img className="error-image" src={ErrorImage} alt="" />
        </>
      ) : (


        
        <Row>
          <Row className="mt-4 mb-4">
            <Col
              md
              className=" d-flex justify-content-center align-items-center mt-2 "
              style={{ color: "#000" }} 
            >
              <AiFillCar size={60} className="mx-3" />
              <div>
                <h4>FREE SHIPPING</h4>
                <p className="subtext">Free shipping on all orders over $99</p>
              </div>
            </Col>
            <Col
              md
              className=" d-flex justify-content-center align-items-center mt-2"
              style={{ color: "#000" }} 
            >
              <RiMoneyDollarCircleLine size={60} className="mx-3" />
              <div>
                <h4>MONEY BACK GUARANTEE</h4>
                <p className="subtext">100% money back guarantee</p>
              </div>
            </Col>
            <Col
              md
              className=" d-flex justify-content-center align-items-center mt-2"
              style={{ color: "#000" }} 
            >
              <Ri24HoursFill size={60} className="mx-3" />
              <div>
                <h4>ONLINE SUPPORT 24/7</h4>
                <p className="subtext">We are here for you 24/7</p>
              </div>
            </Col>
          </Row>
          <Container fluid>
            <Row >
              <Col className="h-100">
              <Image fluid src="src/assets/gd.jpg" />
                
              </Col>
              <Col className="h-100">
              <Image fluid src="src/assets/gd2.jpg" />
                
              </Col>
            </Row>
            
          </Container>
          <h3 className="mt-5 mb-4">
            Featured Products <FaCartArrowDown />
          </h3>
          <Row>
            <Col sm className="d-flex justify-content-center">
              <Button
                variant="outline-primary"
                className="my-3 category-button "
                value="All"
                onClick={(e) => getCategory(e.target.value)}
              >
                All
              </Button>
            </Col>
            {allCategories.map((element) => (
                <Col sm className="d-flex justify-content-center" key={element}>
                  <Button
                    variant="outline-primary"
                    className="my-3 category-button"
                    value={element}
                    onClick={(e) => getCategory(e.target.value)}
                    style={{ backgroundColor: 'transparent', border: '1px solid red' }}
                  >
                    {element}
                  </Button>
                </Col>
            ))}
          </Row>
          <Row className="mt-4 mb-4">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Image fluid src="https://i.ibb.co/3CTPzqB/banned-edited.png" />
          </Row>
          <Row className="p-5">
            <Col sm>
              <Image src="https://i.ibb.co/8bt79r3/instagram.png" fluid />
            </Col>
            <Col sm>
              <Image src="https://i.ibb.co/yQhkmT3/netflix.png" fluid />
            </Col>
            <Col sm>
              <Image src="https://i.ibb.co/B6tSpQC/pincorest.png" fluid />
            </Col>
            <Col sm>
              <Image src="https://i.ibb.co/Fb0phQy/airdnd.png" fluid />
            </Col>
            <Col sm>
              <Image src="https://i.ibb.co/5GnY476/coin-Build.png" fluid />
            </Col>
          </Row>
          <section className="bg-white text-center p-5 mt-4">
            <div className="container p-3">
              <h3 className="text-black">SUBSCRIBE NOW</h3>
              <form action="#" method="Post">
                <Row>
                  <Col md className="margin-auto my-3 ">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="py-2 text-black"
                    >
                      Subscribe<i className="mx-3 fa fa-envelope text-black"></i>
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </section>
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
