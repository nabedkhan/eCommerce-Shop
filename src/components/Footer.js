import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light py-3">
            <Container>
                <Row>
                    <Col>
                        <p className="text-center mb-0">All Reserved Copyright By Nabed Khan &copy; {new Date().getFullYear()}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;