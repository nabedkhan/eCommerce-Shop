import React, { useEffect } from 'react';
import { Alert, Col, Container, Image, ListGroup, Media, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { orderDetails } from '../redux/actions/orderAction';
import Loader from './Loader';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, order } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(orderDetails(id));
    }, [dispatch, id]);

    return (
        <section className="custom-height py-5">
            <Container>
                <Row>
                    {
                        loading ? <Loader /> : (
                            <>
                                <Col md={12} lg={8}>
                                    <h2>Shipping Address</h2>
                                    <hr />
                                    <p className="mb-2"><strong>Name:</strong> {order.shippingAddress.name}</p>
                                    <p className="mb-2"><strong>Email:</strong> {order.shippingAddress.email}</p>
                                    <p className="mb-2"><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                                    <p className="mb-2"><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postalCode}
                                    </p>
                                    {
                                        order.paidAt &&
                                        <Alert variant="success" className="mt-4">{new Date(order.paidAt).toString()}</Alert>
                                    }
                                    <h2 className="mt-5">Order Items</h2>
                                    <hr />
                                    <ListGroup variant="flush">
                                        {
                                            order.cartItems.map(item => {
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
                                    {
                                        order.delivered ?
                                            <Alert variant="success" className="mt-4">Product has been delivered</Alert>
                                            : <Alert variant="danger" className="mt-4">Product hasn't been delivered</Alert>
                                    }
                                </Col>

                                <Col md={12} lg={4}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h2>Order Summery</h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Items: </strong> ${order.items.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Shipping: </strong> ${order.shipping.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Tax: </strong>${order.tax.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Total: </strong>${order.total.toFixed(2)}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </>
                        )
                    }
                </Row>
            </Container>
        </section>
    );
};

export default OrderDetails;