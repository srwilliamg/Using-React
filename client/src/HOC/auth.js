import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function Hoc(HocComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        render: false,
      };
    }

    componentDidMount() {
      this.isAutheticated();
    }

    isAutheticated = () => {
      const token = localStorage.getItem('token');

      fetch('/api/auth/isLogged', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': token,
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {

          if (data.message) {
            throw data.message;
          }
          
          this.setState({
            redirect: data.auth,
            render : true
          });

        })
        .catch(err => {
          this.setState({
            redirect: false,
            render : true
          });
        });
    }

    render() {
      if(this.state.render){
        if (!this.state.redirect) {
          return <Redirect to="/" />;
        }
        
        return (
          <div>
            <HocComponent></HocComponent>
          </div>
        );
      }
      else{
        return <div></div>
      }
    }
  }
}