// Class Component
class Button extends React.Component {
	handleClick = () => {
  	this.props.onClickFunc(this.props.amount);
  };
  
  render() {
  	return (
    	<button onClick={this.handleClick}>
      	+{this.props.amount}
      </button>
    );
  }
}

// Function Component
const Result = (props) => {
	return (
  	<div>{props.label}</div>
  )
};

// Class Component which stores shared state that is then
// used across child components.
class App extends React.Component {
  state = { count: 0};

	incCounter = (amount) => {
  	this.setState((prevState) => ({
    	count: prevState.count + amount
    }));
  };

	render() {
  	return (
    	<div>
        <Button amount={2} onClickFunc={this.incCounter} />
        <Button amount={5} onClickFunc={this.incCounter} />
        <Button amount={10} onClickFunc={this.incCounter} />
        <Result label={this.state.count}/>
      </div>
    );
  }
}

// React can only mount one element, so everything needs to be hierarchical.
ReactDOM.render(<App />, mountNode);