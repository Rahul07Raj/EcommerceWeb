import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getError } from "../utils";
// import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  return   loading?(
    <LoadingBox/>
  ):error? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
     <Row>
      <Col md={6}>
        <img className="img-large" src={product.image} alt={product.name} />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
          <Rating
            rating ={product.rating}
            numReviews={product.numReviews}
          >
          </Rating>
          </ListGroup.Item>
          <ListGroup.Item>
            Price: ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            Discription: 
            <p>{product.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md ={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock>0?
                  ( <Badge bg="success">In Stock</Badge>):
                  (<Badge bg="danger">Unavailable</Badge>)
                  }</Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock>0 &&(
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button variant="primary">
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
     </Row>
    );
};

export default ProductScreen;
