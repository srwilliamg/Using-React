import React, { Component } from 'react';
import './signUp.css';
import {Redirect} from 'react-router-dom';
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      name2:'',
      lastName:'',
      lastName2:'',
      email:'',
      password: '',
      visible: false,
      message: '',
      redirect: false,
    };

    this.signUp = this.signUp.bind(this);
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

  signUp() {
    var data = {
      name: this.state.name,
      name2: this.state.name2,
      lastName: this.state.lastName,
      lastName2: this.state.lastName2,
      email: this.state.email,
      password: this.state.password,
    };

    fetch('/api/signUp', {
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
        console.warn(data);
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
          {this.state.redirect && <Redirect to='/' push={true} />}
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
              <h1 style={{color:'white', textAlign:'center'}}>Sign up</h1>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="labelLogin" for="name">Name</Label>
                      <Input type="name"
                        name="name"
                        placeholder=""
                        value={
                          this.state.name
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
                      <Label className="labelLogin" for="name2">Second name</Label>
                      <Input type="name2"
                        name="name2"
                        placeholder=""
                        value={
                          this.state.name2
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
                      <Label className="labelLogin" for="lastName">Lastname</Label>
                      <Input type="lastName"
                        name="lastName"
                        placeholder=""
                        value={
                          this.state.lastName
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
                      <Label className="labelLogin" for="lastName2">Second Lastname</Label>
                      <Input type="lastName2"
                        name="lastName2"
                        placeholder=""
                        value={
                          this.state.lastName2
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
                      onClick={this.signUp}>
                      Sign up
                  </Button>
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

export default SignUp;
