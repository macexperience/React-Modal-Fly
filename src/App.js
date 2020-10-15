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
		if (e.target.name === 'btn1') {
			this.setState(prevState => ({ showModal1: !prevState.showModal1 }));
		} else if (e.target.name === 'btn2') {
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
					<h3>Step 1</h3>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
					<Footer>
						<button className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next</button>
					</Footer>
				</Step>

				{/* Step 2 */}
				<Step title='Contact Info'>
					<h3>Step 2</h3>
					<div className="row">
						<div className="col-sm-6">
							<div class="input-group">
								<span class="input-group-addon" id="firstNameLabel">First Name</span>
								<input name='firstName' type="text" class="form-control"
									placeholder="First Name" aria-describedby="firstNameLabel"
									onChange={this.handleInputChange} value={this.state.firstName}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div class="input-group">
								<span class="input-group-addon" id="lastNameLabel">Last Name</span>
								<input name='lastName' type="text" class="form-control"
									placeholder="Last Name" aria-describedby="lastNameLabel"
									onChange={this.handleInputChange} value={this.state.lastName}
								/>
							</div>
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
					<table class='table'>
						<tbody>
							<tr>
								<td>Name</td>
								<td>
									John Doe
								</td>
							</tr>
							<tr>
								<td>Date</td>
								<td>
									10/28/2020 at 12:30pm
								</td>
							</tr>
							<tr>
								<td>Type</td>
								<td>
									iPad, Appointment
								</td>
							</tr>
						</tbody>
					</table>
					<Footer>
						<button type='button' className='btn' onClick={e => Steps.previous(e)}>Back</button>
						<button type='button' className='btn btn-primary' onClick={e => Steps.next(e)}>Next (semantic)</button>
					</Footer>
				</Step>

				{/* Step 4 */}
				<Step title='Address'>
					<h3>Step 3</h3>
					<div class="input-group">
						<span class="input-group-addon" id="addressLabel">Address</span>
						<input name='address1' type="text" class="form-control"
							placeholder="Address" aria-describedby="addressLabel"
							onChange={this.handleInputChange} value={this.state.address1}
						/>
					</div>
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
						</div>
						<Footer >
							<button className='btn btn-danger' onClick={this.closeModal2} >Close</button>
							<button className='btn btn-primary' onClick={this.closeModal2} >Thanks</button>
						</Footer>
					</Modalfly>


					<div className="jumbotron">
						<h1>modalfly Testing</h1>
						<p className="lead">A Weevio Modal Component.</p>


						<div className="row text-center">
							<div className="col-md-6">
								<button name='btn1' className="btn btn-lg btn-primary" onClick={this.handleShowClick}>
									Open Workflow Modal
						</button>
							</div>
							<div className="col-md-6">
								<button name='btn2' className="btn btn-lg btn-default" onClick={this.handleShowClick}>
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
