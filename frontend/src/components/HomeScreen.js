
import React, {useState,useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
// import logger from 'use-reducer-logger';
// import data from '../Data';
const reducer =(state,action)=>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state,loading: true};
    case 'FETCH_SUCCESS':
      return {...state,products:action.payload, loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload};
      default:
        return state;
  }
}

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    const [{loading,error,products},dispatch] =useReducer(reducer,
      {
        products:[],
        loading:true, 
        error:''});

    useEffect(() => {
        const fetchData = async ()=>{
            dispatch({type:'FETCH_REQUEST'});
            try{
              const result = await axios.get('/api/products');
              dispatch({type:'FETCH_SUCCESS', payload: result.data});
            }catch(err){
               dispatch({type:'FETCH_FAIL',payload:err.message});
            }
            // setProducts(result.data);
        };
        fetchData();
    }, []);

  return (
    <div>
    <Helmet>
      <title>E-CommerceWeb</title>
    </Helmet>
       <h1>Featured Products</h1>
        <div className="products">
          {
            
            loading?(
              <LoadingBox/>
            ):error? (
              <MessageBox variant="danger">{error}</MessageBox>
            ):(
            <Row>
           { products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Product product ={product}></Product>
            </Col>
          ))}
          </Row>)}
        </div>
    </div>
  )
}

export default HomeScreen
