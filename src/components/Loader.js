import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Loader = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col>
                        <h1>Loading...</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Loader;