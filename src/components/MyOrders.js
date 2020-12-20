import React, { useEffect } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
                                    {
                                        orderList.map((order) => {
                                            return <ListGroup variant="flush">
                                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                            </ListGroup>
                                        })
                                    }
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