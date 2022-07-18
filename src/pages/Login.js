import { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLoginUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contenxt/appContent';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser] = useLoginUserMutation();

  const handleLogin = e => {
    e.preventDefault();
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit('new-user');
        // navigate to chat
        navigate('/chat');
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col
          md={7}
          className="d-flex align-items justify-content flex-direction-column"
        >
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <p className="text-center">
              Don't have an account ? <Link to="/signup">Signup</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
