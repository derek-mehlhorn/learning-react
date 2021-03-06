const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img src={props.avatar_url} width="75"/>
      <div style={{display:'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card {...card}/>)}
    </div>
  );
}

class Form extends React.Component {
	constructor(props) {
      	super(props);
        this.state = {username: 'derek-mehlhorn'};
    }

	handleChange = (event) => {
  	    this.setState({username: event.target.value});
    }

	handleSubmit = (event) => {
        event.preventDefault(); // mark event as handled.
        axios.get(`https://api.github.com/users/${this.state.username}`)
            .then(result => {
            this.props.callback(result.data); // Invoke callback
            this.setState({ username: ''});
		});        
  };

	render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
                value={this.state.username} 
                placeholder="username" 
                onChange={this.handleChange} />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = { data: [] };
  }
  
    addUser = (result) => {
    	this.setState((state, props) => {
          return state.data.push(result);
        });
    };

    render() {
        return (
            <div>
                <Form data={this.state.data} callback={this.addUser}/>
                <CardList cards={this.state.data} />
        </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);