import React, { useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../redux/actions/productsAction';
import Loader from './Loader';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { orderList, loading } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch])
    return (
        <section className="custom-height py-5">
            <Container>
                <Row>
                    <Col>
                        {
                            loading ? <Loader /> : (
                                <>
                                    <h1>My Orders</h1>
                                    <hr />
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>NO</th>
                                                <th>ID</th>
                                                <th>PAID</th>
                                                <th>DELIVERED</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orderList.map((order, index) =>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{order._id}</td>
                                                        <td>
                                                            {
                                                                order.paidAt ?
                                                                    order.paidAt.substring(0, 10)
                                                                    :
                                                                    'Not Paid'
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                order.delivered ?
                                                                    order.delivered.substring(0, 10)
                                                                    :
                                                                    'Not Deliver Yet'
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link to={`/orders/${order._id}`}>
                                                                <Button variant="light">Details</Button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MyOrders;