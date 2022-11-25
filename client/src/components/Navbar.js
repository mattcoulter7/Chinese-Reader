import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default class blah extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Chinese Reader 中文</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dictionary">Dictionary</Nav.Link>
                            <Nav.Link href="/converter">Converter</Nav.Link>
                            <Nav.Link href="/reader">Reader</Nav.Link>
                            <NavDropdown title="Pleco Integration" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/pleco/fileserver">File Server</NavDropdown.Item>
                                <NavDropdown.Item href="/pleco/qcards">Q Cards</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}