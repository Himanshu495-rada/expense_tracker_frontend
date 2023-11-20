import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import NavigationBar from '../../components/NavigationBar'

function Settings() {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function logout() {
    try {
      const response = await fetch(`${backendUrl}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response);

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");
      } else {
        // Handle login error
        alert("Logout failed");
      }
    } catch (error) {
      // Handle network error
      alert("Network error:", error);
    }
  }

  return (
    <>
      <NavigationBar />
      <Container className='d-flex justify-content-center align-items-center mt-4' >
        <Card style={{ width: "500px" }} className='p-4' >
          <Card.Title>
            Profile
          </Card.Title>
          <Card.Body>
            {/* display username with label username */}
            <Card.Text>
              Username: <strong>{localStorage.getItem("username")}</strong>
            </Card.Text>
            <Button variant='danger' onClick={logout}>Logout</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Settings