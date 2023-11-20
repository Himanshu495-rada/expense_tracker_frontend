import React, { useState, useEffect } from 'react'
import { Navbar, Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Lottie from 'react-lottie';
import animationData from "../../assets/animation.json";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginShow = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false);

  const handleSignupShow = () => setShowSignupModal(true);
  const handleSignupClose = () => setShowSignupModal(false);

  const handleSignupButtonClick = () => {
    handleLoginClose();
    handleSignupShow();
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;
    const formData = {
      email: username,
      password: password,
    };
    console.log('Login Form Data:', formData);

    try {

      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password": password }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token;

        // Store the token in local storage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("username", username);
        navigate("/dashboard");
        handleLoginClose();
      } else {
        // Handle login error
        alert("Login failed");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }

  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const usernameUP = event.target.elements.formSignupEmail.value;
    const passwordUP = event.target.elements.formSignupPassword.value;
    const formData = {
      email: usernameUP,
      password: passwordUP,
    };
    console.log('Signup Form Data:', formData);

    try {
      const response = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": usernameUP, "password": passwordUP }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleSignupClose();
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Network error:", error);
    }
  };


  useEffect(() => {
    if (token) {
      fetch(`${backendUrl}/authenticate`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.ok) {
            navigate("/dashboard");
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          navigate("/error");
        });
    }
  }, [token]);


  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{ marginLeft: "40px", fontSize: "40px" }} href="/">Expense Tracker</Navbar.Brand>
        <Button variant="outline-light" onClick={handleLoginShow} style={{ marginLeft: "auto", marginRight: "40px" }}>Login</Button>
      </Navbar>

      {/* Landing Page Content */}
      <Container className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div className="text-center">
              <h1>Welcome to Expense Tracker</h1>
              <p>Your go-to solution for managing your expenses efficiently.</p>
            </div>
            <div className="mt-4">
              <p>Learn how to:</p>
              <ul>
                <li>Track your expenses</li>
                <li>Create budgets</li>
                <li>Generate insightful reports</li>
              </ul>
            </div>
          </Col>
          <Col md={6} className="text-center mt-4 mt-md-0">
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
            />
          </Col>
        </Row>
      </Container>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Row className='mt-3 align-items-center' >
              <Col>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Col>
              <Col  >
                OR
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={handleSignupButtonClick}>
                  Signup
                </Button>
              </Col>
            </Row>

          </Form>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={handleSignupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" >
              Signup
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Home