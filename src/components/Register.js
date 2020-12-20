import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { newUserCreation } from '../redux/actions/userLoginAction';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [warning, setWarning] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { success, error } = useSelector(state => state.userLoginInfo);

    let emailValidate = false;
    if (/\S+@\S+\.\S+/.test(email)) {
        emailValidate = true;
    }

    useEffect(() => {
        if (success) {
            history.push('/')
        }
    }, [success, history])

    const handleSubmit = (e) => {
        if (emailValidate && password === confirmPassword) {
            dispatch(newUserCreation(email, password));
        } else {
            setWarning('Password did not match');
        }
        e.preventDefault();
    }

    return (
        <section className="custom-height d-flex align-items-center">
            <Container>
                <Row>
                    <Col md={6}>
                        <h2>Create a new account</h2>
                        <hr className="mb-5" />
                        {warning && <Alert variant="danger">{warning}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onBlur={e => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    onBlur={e => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    onBlur={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" className="mt-3" type="submit">Sign Up</Button>
                        </Form>
                        <p className="mb-0 mt-3">Already have an account? <Link to="/login">Login</Link></p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;