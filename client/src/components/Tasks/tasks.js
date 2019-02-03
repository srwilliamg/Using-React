import React, { Component } from 'react';
import {
  Col,
  Row,
  Badge,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,

} from 'reactstrap';
import dateFormat from 'dateformat';
// import ReactDataGrid from 'react-data-grid';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      loading: false,
      modal: false,
      priority: '',
      completionDate: '',
      name:'',
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    const token = localStorage.getItem('token');

    // Waiting for the data
    this.setState({
      loading: true
    });

    fetch('/api/home/consultTasks', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': token,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          throw data.message;
        }
        setTimeout(() => {
          // console.warn(data);
          this.setState({
            tasks: data,
            loading: false,
          });
        }, 1000);
      })
      .catch(err => {
        console.error("Couldn't get tasks from server", err);
        // this.setState({
        //   visible: true,
        //   message: err
        // });
      });
  }

  createTask = () => {
    const token = localStorage.getItem('token');
    console.info('Creating task');

    const data = {
      name : this.state.name,
      priority : this.state.priority,
      completionDate: dateFormat(this.state.completionDate, "isoDateTime"),
    }

    fetch('/api/home/createTask', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          throw data.message;
        }
        console.warn('create::',data);
        this.setState({
          loading: false,
          modal: !this.state.modal
        });

        this.getTasks();
      })
      .catch(err => {
        console.error("Couldn't get tasks from server", err);
        // this.setState({
        //   visible: true,
        //   message: err
        // });
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput = ({ target })  => {
    this.setState({
      [target.name]: target.value
    });
  }

  renderCreateModal = () =>{
    return <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="name">Task's name</Label>
                  <Input 
                    type="text"
                    name="name"
                    placeholder="Task's name here"
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
                  <Label for="priority">Priority</Label>
                  <Input
                    type="number"
                    name="priority"
                    min="0"
                    placeholder="0"
                    value={
                      this.state.priority
                    }
                    onChange={
                      this.updateInput
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="completionDate">Completion date</Label>
                  <Input
                    type="date"
                    name="completionDate"
                    placeholder="YYYY/MM/DD"
                    value={
                      this.state.completionDate
                    }
                    onChange={
                      this.updateInput
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createTask}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  }

  renderTasks = () => {

    return this.state.tasks.map(task => {
      let color = 'secondary';
      let render;
      if (task.priority >= 5 && task.priority < 10) {
        color = 'primary';
      }
      else if (task.priority >= 10) {
        color = 'warning';
      }

      render = <ListGroupItem key={task.idTask}
        className="justify-content-between">{task.name}
        <Badge className="float-right" color={color} pill>{task.priority}</Badge>
      </ListGroupItem>

      return render;
    }
    )
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col >
              <h2>Tasks</h2>
            </Col>
            <Col className="align-self-center" xs={{ size: 6, offset: 0 }} md={{ size: 4, offset: 0 }}>
              <Button className="float-right" color="primary" onClick={this.toggle}>Create new task</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <ListGroup>
            {
              this.state.loading ?
                <Spinner className="align-self-center" color="primary" />
                :
                this.renderTasks()
            }
          </ListGroup>
        </CardBody>
        {this.renderCreateModal()}
      </Card>
    );
  }
}

export default Tasks;
