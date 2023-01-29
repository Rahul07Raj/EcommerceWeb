// import data from "./Data";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column site-container ">
          <header>
            <Navbar bg="dark" variant="dark">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>EcommerceWeb</Navbar.Brand>
                </LinkContainer>
              </Container>
            </Navbar>
          </header>
          <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
          </main>
          <footer>
            <div className="text-center">All Rights reserved @2023</div>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
