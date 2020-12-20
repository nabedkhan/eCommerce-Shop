import React, { useEffect } from 'react';
import { Alert, Col, Container, Image, ListGroup, Media, Row } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { placeOrder } from '../redux/actions/orderAction';

const Order = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartItems, shippingAddress } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.userLoginInfo);
    const { complete } = useSelector(state => state.order);
    const { name, email, address, phone, city, country, postalCode } = shippingAddress;

    const items = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = items > 1000 ? items * 0.05 : 0;
    const shipping = items > 1000 ? items * 0.02 : 0;
    const total = items + tax + shipping;

    const handlePlaceOrder = (paymentResult) => {
        const orderDetails = {
            userInfo: userInfo,
            items: cartItems,
            shippingAddress: shippingAddress,
        }
        dispatch(placeOrder(orderDetails, paymentResult));
    }

    useEffect(() => {
        if (complete) {
            history.push('/orderSuccess');
        }
    }, [complete, history]);

    return (
        <section className="custom-height py-5">
            <Container>
                <Row>
                    <Col md={12} lg={7}>
                        <h2>Shipping Address</h2>
                        <hr />
                        <p className="mb-2"><strong>Name:</strong> {name}</p>
                        <p className="mb-2"><strong>Email:</strong> {email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {phone}</p>
                        <p className="mb-2"><strong>Address:</strong> {address}, {city}, {country} {postalCode}</p>

                        <h2 className="mt-5">Order Items</h2>
                        <hr />
                        <ListGroup variant="flush">
                            {
                                cartItems.map(item => {
                                    return (
                                        <ListGroup.Item className="px-0" key={item.id}>
                                            <Media>
                                                <Image src={item.image} width="120" thumbnail />
                                                <Media.Body className="ml-3">
                                                    <h4>{item.name}</h4>
                                                    <h5>Price: ${item.price}</h5>
                                                    <h5>Quantity: {item.qty}</h5>
                                                </Media.Body>
                                            </Media>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    </Col>

                    <Col md={12} lg={5}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summery</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Items: </strong> ${items.toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Shipping: </strong> ${shipping.toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Tax: </strong>${tax.toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Total: </strong>${total.toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {
                                    (cartItems.length > 0 && address) ?
                                        < PayPalButton
                                            amount={total.toFixed(2)}
                                            onSuccess={handlePlaceOrder}
                                        />
                                        :
                                        <Alert variant="danger">
                                            Please Provide a shipping address and necessary info
                                        </Alert>
                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Order;