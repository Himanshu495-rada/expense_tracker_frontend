import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand style={{ marginLeft: "40px", fontSize: "40px" }} >
                <Nav.Link as={Link} to="/dashboard">Expense Tracker</Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ marginLeft: "auto", marginRight: "40px" }}>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    {/* <Nav.Link as={Link} to="/budgeting">Budgeting</Nav.Link> */}
                    <Nav.Link as={Link} to="/entry">Entry</Nav.Link>
                    <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
                    <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;