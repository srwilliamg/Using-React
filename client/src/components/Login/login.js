import React, { Component } from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      visible: false,
      message: '',
      redirect: false,
    };

    this.logIn = this.logIn.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({
      visible: false
    });
  }

  updateInput({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  logIn() {
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    fetch('/api/auth/logIn', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          throw data.message;
        }
        // console.warn(data);
        localStorage.setItem('token', data.token);
        this.setState({
          redirect: true
        });
      })
      .catch(err => {        
        this.setState({
          visible: true,
          message: err
        });
      });
  }

  render() {
    return (
      <div className="bg h-100">
        <Container className="h-100">
          {this.state.redirect && <Redirect to='/home' push={true} />}
          < Alert
            color="danger"
            isOpen={
              this.state.visible
            }
            toggle={
              this.onDismiss
            } >
            {this.state.message}
          </Alert>
          <Row className="loginPosition align-items-center">
            <Col xs={{ size: 8, offset: 2 }}>
              <h1 style={{color:'white', textAlign:'center'}}>Using react</h1>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="labelLogin" for="email">Email</Label>
                      <Input type="email"
                        name="email"
                        placeholder="example@examaple.com"
                        value={
                          this.state.email
                        }
                        onChange={
                          this.updateInput
                        }
                        autoFocus
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="labelLogin" for="password">Password</Label>
                      <Input type="password"
                        name="password"
                        placeholder="*******"
                        value={
                          this.state.password
                        }
                        onChange={
                          this.updateInput
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                    <Button
                      size="lg"
                      outline
                      color="primary"
                      onClick={this.logIn}>
                      Sign in
                  </Button>
                  </Col>
                  <Col xs={{size:6, offset:3}}  style={{ textAlign: 'center' }}>
                    <Link to="signUp">
                      Sign up
                    </Link>
                  </Col>
                </Row>

              </Form>
            </Col>
          </Row>

        </Container>

      </div>
    );
  }
}

export default Login;
