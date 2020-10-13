import React, { Component } from 'react';
import { ModalflyContainer, Modalfly, Steps, Step, Footer } from './modalfly/index';

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
	handleShowClick = e => {
		// console.log('e.target.name:', e.target.name)
		if (e.target.name === 'btn1') {
			this.setState(prevState => ({ showModal1: !prevState.showModal1 }));
		} else if (e.target.name == 'btn2') {
			this.setState(prevState => ({ showModal2: !prevState.showModal2 }));
		}
	}
	closeModal1 = () => {
		this.setState({ showModal1: false });
	}
	closeModal2 = () => {
		this.setState({ showModal2: false });
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {

		const steps = (
			<Steps>
				{/* Step 1 */}
				<Step title='First Step'>
					<h3>Step Component</h3>
					<p>Some content</p>
					<Footer>
						<button className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next</button>
					</Footer>
				</Step>

				{/* Step 2 */}
				<Step title='Contact Info'>
					<h3>Step 1</h3>
					<div className="row">
						<div className="col-sm-6">
							<Input label='First Name' name='firstName' onChange={this.handleInputChange} value={this.state.firstName} /></div>
						<div className="col-sm-6">
							<Input label='Last Name' name='lastName' onChange={this.handleInputChange} value={this.state.lastName} />
						</div>
					</div>
					<br />
					<Footer>
						<button className="btn" type='button' onClick={e => Steps.previous(e)}>Back</button>
						<button className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next In Footer</button>
					</Footer>
				</Step>

				{/* Step 3 */}
				<Step title='Actions' style={{ textAlign: 'center' }}>
					<Table basic='very' celled>
						<Table.Body>
							<Table.Row>
								<Table.Cell>Name</Table.Cell>
								<Table.Cell>
									John Doe
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Date</Table.Cell>
								<Table.Cell>
									10/28/2020 at 12:30pm
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Type</Table.Cell>
								<Table.Cell>
									iPad, Appointment
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
					<Footer>
						<Button onClick={e => Steps.previous(e)}>Back</Button>
						<Button primary onClick={e => Steps.next(e)}>Next (semantic)</Button>
					</Footer>
				</Step>

				{/* Step 4 */}
				<Step title='Address'>
					<h3>Step 3</h3>
					<Input label='Address' name='address1' onChange={this.handleInputChange} value={this.state.address1} />
					<Footer>
						<button className="btn" type='button' onClick={e => Steps.previous(e)}>Back</button>
						<button className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next In Footer</button>
					</Footer>
				</Step>

				{/* Step 5 */}
				<Step title='Last Step' style={{ textAlign: 'center' }}>
					<h1>Complete</h1>
					<h3>The Last Step</h3>
					<br /><br /><br /><br /><br />
					<br /><br /><br /><br /><br />
					<Footer>
						<button className="btn" type='button' onClick={e => Steps.previous(e)}>Back</button>
					</Footer>
				</Step>
			</Steps>
		);

		return (
			<>
				<div className="container">

					{/* MODAL COMPONENT 1 */}
					<Modalfly size='extraLarge' workflow show={this.state.showModal1} onClose={this.closeModal1}>
						{steps}
					</Modalfly>

					{/* MODAL COMPONENT 2 */}
					<Modalfly
						//size='small'
						title='Single View Modal'
						show={this.state.showModal2}
						onClose={this.closeModal2}
						footerContent='spaceEvenly'
					>
						<div style={{ textAlign: 'center' }}>
							<h3>Would you like to overwrite?</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore facilis
								iusto labore repellendus error, doloremque assumenda ab sit voluptate quasi expedita rem modi
								tempore voluptatum consequuntur debitis officiis? Voluptas, sit!
							</p>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</div>
						<Footer >
							<Button negative onClick={this.closeModal2} >Close</Button>
							<Button positive onClick={this.closeModal2} >Thanks</Button>
						</Footer>
					</Modalfly>


					<div className="jumbotron">
						<h1>modalfly Testing</h1>
						<p className="lead">A Weevio Modal Component.</p>


						<div className="row text-center">
							<div className="col-md-6">
								<button name='btn1' className="btn btn-lg btn-primary" onClick={this.handleShowClick} role="button">
									Open Workflow Modal
						</button>
							</div>
							<div className="col-md-6">
								<button name='btn2' className="btn btn-lg btn-default" onClick={this.handleShowClick} role="button">
									Open Single View Modal
						</button>
							</div>
						</div>
					</div>

				</div>
				<ModalflyContainer />
			</>
		);
	}
}

export default App;
