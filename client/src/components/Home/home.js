import React from 'react';
import './home.css';
import {
	Container,
	Row,
	Col,
} from 'reactstrap';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				visible: false,
				redirect: false,
				message: '',
		};
	}

	componentDidMount(){
		const token = localStorage.getItem('token');
		console.warn(token);
		
		fetch('/api/home/consultTasks', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Accept': 'application/json',
				'content-type': 'application/json',
				'Authentication': token,
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
			<Container>
				<Row>
					<Col>
						<h1>HOME</h1>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;