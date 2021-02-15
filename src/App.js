import React, { Component } from 'react';
import {
	ModalflyContainer, Modalfly, Steps,
	Step, Footer, ModalflyThemeContext
} from './modalfly/index';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			showModal1: false,
			showModal2: true,
			resetSteps: true,
			firstName: '',
			lastName: '',
			phone: '',
			address1: '',
			modalFlyTheme: {
				headerClassName: 'mac-brushed-metal',
				headerTextClassName: 'header-large',
				footerClassName: 'mac-brushed-metal-footer',
				closeBtnClassName: 'mac-close-icon'
			}
		};
	}
	handleShowClick = e => {
		if (e.target.name === 'workflowModal') {
			this.setState(prevState => ({ showModal1: !prevState.showModal1 }));
		} else if (e.target.name === 'singleViewModal') {
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

	handleComplete = () => {
		this.setState(prevState => ({ showModal1: !prevState.showModal1 }));
		Steps.complete();
	}

	handleResetCheckbox = (e) => {
		const { target } = e;
		this.setState({ resetSteps: target.checked });
	}

	render() {

		const steps = (
			<Steps>
				{/* Step 1 */}
				<Step title='First Step'>
					<h3>Step 1</h3>
					<p>All <code>Step</code> components must be wrapped by a single <code>Steps</code> component.</p>
					<p>Each step is wrapped by <code>Step</code> component.</p>
					<p>
						The <code>Footer</code> component utilizes <strong>ReactDOM Portals</strong> to automatically
						render the section in the footer area. This allows you to utilize the button components of your choice.
					</p>
					<Footer>
						<button className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next</button>
					</Footer>
				</Step>

				{/* Step 2 */}
				<Step title='Contact Info'>
					<h3>Step 2</h3>
					<p>React-Modal-Fly only uses state to track the current step in the workflow. It does not persist any field data in any step. The state of any fields must be tracked by the parent component.</p>
					<p style={{ textAlign: 'center' }}>The state below is tracked by the parent component, <code>App</code>.</p>
					<div className="row">
						<div className="col-sm-6">
							<div className="input-group">
								<span className="input-group-addon" id="firstNameLabel">First Name</span>
								<input name='firstName' type="text" className="form-control"
									placeholder="First Name" aria-describedby="firstNameLabel"
									onChange={this.handleInputChange} value={this.state.firstName}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="input-group">
								<span className="input-group-addon" id="lastNameLabel">Last Name</span>
								<input name='lastName' type="text" className="form-control"
									placeholder="Last Name" aria-describedby="lastNameLabel"
									onChange={this.handleInputChange} value={this.state.lastName}
								/>
							</div>
						</div>
					</div>
					<br />
					<Footer>
						<button className="btn" type='button' onClick={e => Steps.previous(e)}>Back</button>
						<button style={{ marginLeft: '20px' }} className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next</button>
					</Footer>
				</Step>

				{/* Step 3 */}
				<Step title='Actions'>
					<h3>Step 3</h3>
					<p>Display anything you want in a <code>Step</code> component.</p>
					<table className='table' style={{ textAlign: 'center' }}>
						<tbody>
							<tr>
								<td>Name</td>
								<td>John Doe</td>
							</tr>
							<tr>
								<td>Date</td>
								<td>10/28/2020 at 12:30pm</td>
							</tr>
							<tr>
								<td>Type</td>
								<td>iPad Appointment</td>
							</tr>
						</tbody>
					</table>
					<Footer>
						<button type='button' className='btn' onClick={e => Steps.previous(e)}>Back</button>
						<button style={{ marginLeft: '20px' }} type='button' className='btn btn-primary' onClick={e => Steps.next(e)}>Next</button>
					</Footer>
				</Step>

				{/* Step 4 */}
				<Step title='Address'>
					<h3>Step 4</h3>
					<p>The <strong>Previous</strong> and <strong>Next</strong> buttons must use their <code>onClick</code> prop to go back or continue the workflow.</p>
					<p>For Example: <code>{'onClick={e => Steps.previous(e)}'}</code> or <code>{'onClick={e => Steps.next(e)}'}</code>.</p>
					<Footer>
						<button className="btn" type='button' onClick={e => Steps.previous(e)}>Back</button>
						<button style={{ marginLeft: '20px' }} className="btn btn-primary" type='button' onClick={e => Steps.next(e)}>Next</button>
					</Footer>
				</Step>

				{/* Step 5 */}
				<Step title='Last Step'>
					<h3>Step 5</h3>
					<p>When completing the workflow be sure to reset React-Modal-Fly's state by calling <code>Steps.complete()</code>.</p>
					<p>The complete function can be called in either an external method or inline.</p>
					<p style={{ marginTop: '2em' }}><strong>Inline Method:</strong></p>
					<code>{`<button onClick={e => { this.handleComplete(); Steps.complete(); }}>Click Me</button>`}</code>
					<Footer>
						<button className="btn" type='button' onClick={e => Steps.previous(e)}>Back</button>
						<button style={{ marginLeft: '20px' }} name='workflowModal' className='btn btn-success' onClick={e => { this.handleShowClick(e); Steps.complete(e); }}>Inline Complete</button>
						<button style={{ marginLeft: '20px' }} name='workflowModal' className='btn btn-success' onClick={this.handleComplete}>Complete Handler Method</button>
					</Footer>
				</Step>
			</Steps>
		);

		return (
			<>
				<ModalflyThemeContext.Provider
					value={this.state.modalFlyTheme}>
					<div style={{ marginTop: '2em' }} className="container">

						{/* MODAL COMPONENT 1 */}
						<Modalfly size='extraLarge' workflow
							resetSteps={this.state.resetSteps}
							show={this.state.showModal1} onClose={this.closeModal1}
						>
							{steps}
						</Modalfly>

						{/* MODAL COMPONENT 2 */}
						<Modalfly
							title='React-Modal-Fly'
							show={this.state.showModal2}
							onClose={this.closeModal2}
							footerContent='spaceEvenly'
							useDefaultStyle
							//closeBtnClassName='mac-close-icon'
							//footerClassName='mac-brushed-metal-footer'
							//headerClassName='mac-brushed-metal'
							//headerClassName='mac-brushed-metal'
							//headerTextClassName='header-large'
						>
							<div>
								<h3 style={{ textAlign: 'center' }}>Single View Modal</h3>
								<p>
									This is a single view modal.
							</p>
							</div>
							<Footer>
								<button className='btn btn-danger' onClick={this.closeModal2} >Close</button>
								<button className='btn btn-primary' onClick={this.closeModal2} >Done</button>
							</Footer>
						</Modalfly>


						<div className="jumbotron">
							<h1>React-Modal-Fly <span style={{ color: 'grey' }}>Demo</span></h1>
							<p className="lead">A Weevio Modal Component.</p>

							<div style={{ marginTop: '100px' }} className="row text-center">
								<div className="col-md-6">
									<button name='workflowModal' className="btn btn-lg btn-primary" onClick={this.handleShowClick}>
										Open Workflow Modal
								</button>
									<div className="form-group">
										<div className="checkbox">
											<input
												checked={this.state.resetSteps}
												onChange={this.handleResetCheckbox}
												type="checkbox" /> Reset steps after closing modal
									</div>
									</div>
									<strong>Note: </strong>
									<span>If disabled, steps are not reset when clicking the close button. This allows you to continue with
									closing the modal and keep your current step so that if the modal is opened again, the current step is maintained.
									One could also implement some effect when clicking the close icon. For example, this could be used to show a warning
									to the user before closing and reseting.</span>
								</div>
								<div className="col-md-6">
									<button name='singleViewModal' className="btn btn-lg btn-default" onClick={this.handleShowClick}>
										Open Single View Modal
								</button>
								</div>
							</div>
						</div>

					</div>
					<ModalflyContainer />
				</ModalflyThemeContext.Provider>
			</>
		);
	}
}

export default App;