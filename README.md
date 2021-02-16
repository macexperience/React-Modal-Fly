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

### Single View Mode
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

### Workflow Mode
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
|headerClassName| `String` |**None** | Override header default style with custom styling. |
|headerTextClassName | `String` | **None** | Override the header `<h3>` with custom styling. |
|closeBtnClassName | `String` | **None** | Override the close button `<i>` with custom styling. |
|footerClassName | `String` | **None** | Override the footer default style with custom styling. |
|footerContent | `String` | "left", "center", "**right**", "spaceBetween", "spaceAround", "spaceEvenly"|Controls how the footer content will be aligned. |
| footerStyle | `Object` | **null** | Inline style object |
|onClose | `func` | **None** | If an onClose function is not provided, the close icon button is not displayed. |
|resetSteps| `Boolean` | **`true`**, `false` | If `false`, the current step is not reset to `0` after calling the onClose handler. This is useful for close warnings. *Only applies to `workflow` mode.* |
|show | `Boolean` | `True`, **`False`** | Controls whether or not the Modal is displayed. |
|size | `String` | "small", "**medium**", "large", "extraLarge" | The size of the modal.
|style | `Object` | **null** | Inline style object |
|title      | `String` | "**Attention**" |Sets the modal title. |
|workflow | `Boolean` | `True`, **`False`** | Controls whether or not the Modal is in workflow mode. |

#### Using Class Names Props
- `headerClassName`
	- If you choose to provide this as a prop or context theme, maintain the close button position in the header by ensuring the class has the following styles:
		- `display: flex;`
		-  `justify-content: space-between;`
        - `align-items: center;`
- `closeBtnClassName`
	- If you choose to omit Flexbox from your `headerClassName` class, you may use this prop to style and position your close button as you see fit.
- `footerClassName`
	- If you choose to utilize this as a prop or context theme, the `footerContent` prop is ignored (and its default). This leaves the replacing class to position the footer content. 
- If `useDefaultStyle` prop is provided, the `footerContent` prop is not ignored.

#### Closer Look: `onClose`  & `resetSteps` Props 
The `resetSteps` prop is useful for when you want to execute some custom behavior (close warning) when the close button is clicked *before*  without the current step reset to `0` (first step). The included demo shows this in action. View the function logic below for a better understanding.

`src/modalfly/components/Modalfly/Modalfly.js`
```js
const  onCancel  =  ()  => {
	//Check 'resetSteps' prop, if 'false', do not reset steps.
	let reset = props.resetSteps ===  undefined  ?  true  : props.resetSteps;
	//Always reset when in 'single view' mode
	if (props.workflow ===  undefined) {
		reset =  true;
	}
	//Call client's onClose handler
	props.onClose();
	//Reset workflow steps
	if (reset) {
		dispatch({ type: actions.RESET });
	}
}
```

#### Step Component Props
Default value is in **bold**.
| Prop Name | Type | Options | Description |
| --------- | ---- | ------- | ----------- |
|className| `String` | **None**| Class name that will be applied to the Step's `<div>`. |
|style | `Object` | **None**| Style object that will be applied to the Step's `<div>`. |
|title | `String` | **Empty String** | The title that will be displayed at this step. |

### Modalfly Theme Context
Place above all modalfly components. Ideally, wrap the entire app with the provider as seen below.
  ```js
  import React, {useState} from 'react';
  //Import context and modalfly
  import { Modalfly, ModalflyThemeContext } from  'react-modal-fly';
  
  function  App() {
	const [theme, setTheme] = useState({
		headerClassName:  'mac-brushed-metal',
		headerTextClassName:  'header-large',
		footerClassName:  'mac-brushed-metal-footer',
		closeBtnClassName:  'mac-close-icon'
	});
	//Place provider above all potential Modalfly components
	return (
		<ModalflyThemeContext.Provider value={theme}>
			{/* Main content may contain the entire app with multiple modalfly components. */}
			<MainContent>
		</ModalflyThemeContext.Provider>
	);
}
  ```

| Prop Name | Type | Context Properties | Description |
| --------- | ---- | ------- | ----------- |
|value| `Object` | "headerClassName", "headerTextClassName", "footerClassName", "closeBtnClassName" | The class name properties are used as described above in the Modalfly component props. Using them in this context will apply the classes to all child Modalfly components. |


## Styling
Styles can be found at `src/modalfly/styles/styles.js`.

## Demos
Demos coming soon for CodeSandbox.
