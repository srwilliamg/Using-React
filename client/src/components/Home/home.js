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
		};
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