# React-Modal-Fly

React-Modal-Fly allows you to add easy modal popups to your React app.

## Installation
```
$ npm install --save react-modal-fly
```
## Documentation

The `ModalflyContainer` component must be mounted in order for React-Modal-Fly to work.
We recommend placing the component  as the last component in the root of the app.

App.js
```jsx
function App() {
    return (
	<>
	    <MainContent>
	    <ModalflyContainer />
	</>
    );
}
```

React-Modal-Fly has two primary modes, Single View and Workflow.

#### Single View Mode
Single View Mode displays its contents like a traditional modal. 
```jsx
<Modalfly
title='Demo'
show={showModal}
onClose={this.handleClose}
>
    <div>
	<h3>Single View Mode</h3>
	<p>Content paragraph.</p>
    </div>
    <Footer>
	<button onClick={this.handleClose}>Close</button>
    </Footer>
</Modalfly>
```

#### Workflow Mode
Workflow Mode accepts multiple `Step` components that can be navigated using a simple function.
```jsx
<Modalfly
size='extraLarge'
workflow
show={showModal}
onClose={this.handleClose}
>
    <Steps>
        <Step title='Contact Info'>
	    <h3>Step 1</h3>
	    <p>Content</p>
	    <Footer>
	        <button onClick={e => Steps.next(e)}>Next</button>
	    </Footer>
	</Step>
	<Step title='Device Details'>
	    <h3>Step 2</h3>
	    <p>Content</p>
	    <Footer>
		<button onClick={e => Steps.previous(e)}>Back</button>
		<button onClick={e => Steps.next(e)}>Next</button>
	    </Footer>
	</Step>
	<Step title='Confirm'>
	    <h3>Step 3</h3>
	    <p>Content</p>
	    <Footer>
		<button onClick={e => Steps.previous(e)}>Back</button>
		<button onClick={e => {this.handleComplete(); Steps.complete(e);}}>Complete</button>
	    </Footer>
	</Step>
    </Steps>
</Modalfly>
```
The `Steps` component must be used in workflow mode because it uses context to achieve the forward and back functionality.

#### Modalfly Component Props
Default value is in **bold**.
| Prop Name | Type | Options | Description |
| --------- | ------ | ------ | ----- |
|footerContent | `String` | "left", "center", "**right**", "spaceBetween", "spaceAround", "spaceEvenly"|Controls how the footer content will be aligned. |
| footerStyle | `Object` | **null** | Inline style object |
|onClose | `func` | **None** | If an onClose function is not provided, the close icon button is not displayed. |
|show | `Boolean` | `True`, **`False`** | Controls whether or not the Modal is displayed. |
|size | `String` | "small", "**medium**", "large", "extraLarge" | The size of the modal.
|style | `Object` | **null** | Inline style object |
|title      | `String` | "**Attention**" |Sets the modal title. |
|workflow | `Boolean` | `True`, **`False`** | Controls whether or not the Modal is in workflow mode. |

#### Step Component Props
Default value is in **bold**.
| Prop Name | Type | Options | Description |
| --------- | ---- | ------- | ----------- |
|className| `String` | **None**| Class name that will be applied to the Step's `<div>`. |
|style | `Object` | **None**| Style object that will be applied to the Step's `<div>`. |
|title | `String` | **Empty String** | The title that will be displayed at this step. |

## Styling
Styles can be found at `src/modalfly/styles/styles.js`.

## Demos
Demos coming soon for CodeSandbox.
