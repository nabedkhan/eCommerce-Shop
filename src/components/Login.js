import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { loginUser, generateAuthToken } from '../redux/actions/userLoginAction';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const { error, success } = useSelector(state => state.userLoginInfo);

    let emailValidate = false;
    if (/\S+@\S+\.\S+/.test(email)) {
        emailValidate = true;
    }

    useEffect(() => {
        if (success) {
            dispatch(generateAuthToken());
            history.replace(from);
        }
    }, [dispatch, success, history, from])

    const handleSubmit = (e) => {
        if (emailValidate) {
            dispatch(loginUser(email, password));
        }
        e.preventDefault();
    }

    return (
        <section className="custom-height d-flex align-items-center">
            <Container>
                <Row>
                    <Col md={6}>
                        <h2>Login</h2>
                        <hr className="mb-5" />
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onBlur={e => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    onBlur={e => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" className="mt-3" type="submit">Sign In</Button>
                        </Form>
                        <p className="mb-0 mt-3">Don't have an account? <Link to="/register">Create a new account</Link></p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;