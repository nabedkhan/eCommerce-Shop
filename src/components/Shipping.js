import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userShippingInfo } from '../redux/actions/cartAction';

const Shipping = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { shippingAddress } = useSelector(state => state.cart);
    const { success } = shippingAddress;
    const [shippingInfo, setShippingInfo] = useState({
        name: shippingAddress.name,
        email: shippingAddress.email,
        address: shippingAddress.address,
        phone: shippingAddress.phone,
        city: shippingAddress.city,
        country: shippingAddress.country,
        postalCode: shippingAddress.postalCode
    });
    const handleChange = (e) => {
        const newShippingInfo = { ...shippingInfo };
        newShippingInfo[e.target.name] = e.target.value;
        setShippingInfo(newShippingInfo);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userShippingInfo(shippingInfo));
    }
    useEffect(() => {
        if (success) {
            history.push('/order');
        }
    }, [history, success]);

    return (
        <section className="custom-height d-flex align-items-center">
            <Container>
                <Row>
                    <Col md={8} lg={6}>
                        <h2>Shipping Address</h2>
                        <hr />
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={shippingInfo.name}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={shippingInfo.email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={shippingInfo.address}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control
                                type="number"
                                name="phone"
                                placeholder="Phone Number"
                                value={shippingInfo.phone}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="City"
                                value={shippingInfo.city}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={shippingInfo.country}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control
                                type="number"
                                name="postalCode"
                                value={shippingInfo.postalCode}
                                placeholder="Postal Code"
                                onChange={handleChange}
                                required
                            />
                            <Button
                                className="mt-4 w-100"
                                variant="primary"
                                type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Shipping;