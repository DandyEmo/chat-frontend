import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useSignupUserMutation } from '../services/appApi';
import { useHistory } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupUser] = useSignupUserMutation();
  const navigate = useNavigate();

  const handleSignup = e => {
    e.preventDefault();
    signupUser({ name, email, password }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate('/chat');
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items justify-content flex-direction-column"
        >
          <Form onSubmit={handleSignup}>
            <h1 className="text-center">Create account</h1>
            <div className="signup-profile-pic__container"></div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create account
            </Button>
            <div className="py-4">
              <p className="text-center">
                {' '}
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
