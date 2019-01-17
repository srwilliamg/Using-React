import React, { Component } from 'react';
import './customers.css';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      token: null,
    };

    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/getToken')
    .then(res => res.json())
    .then(data => this.setState({
      token: data.token
    }, () => console.log('Token fetched...', data)))
    .then(() => {
      this.getTasks();
    })
    .catch(error=> console.log('Error::',error));
  }

  getTasks(){
    var data = {
      idUser: 1,
    };

    console.log(this.state.token);

    fetch('http://localhost:5000/api/home/consultTasks', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'X-CSRF-TOKEN': this.state.token,
        }
      })
      .then(res => res.json())
      .then(json => this.setState({
        tasks: json.data
      }, () => console.log('Tasks fetched...', data)));
  }

  render() {
    return (
      <div>
        <h2>Tasks</h2>
        <ul>
        {this.state.tasks.map(tasks => 
          <li key={tasks.idTask}>{tasks.name} {tasks.priority}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Tasks;
