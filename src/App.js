import React, { Component } from 'react';
import { ModalflyContainer } from './modalfly/index';
import Homepage from './Homepage/Homepage';

class App extends Component {
	constructor() {
		super();
		this.state = {
			showModal1: false,
			showModal2: false,
			firstName: '',
			lastName: '',
			phone: '',
			address1: ''
		};
	}


	render() {
		return (
			<>
				<Homepage />
				<ModalflyContainer />
			</>
		);
	}
}

export default App;
