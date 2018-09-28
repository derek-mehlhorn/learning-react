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
        this.userNameInput = React.createRef();
    }

	handleSubmit = (event) => {
        this.props.callback(this.userNameInput.current.value); // Invoke callback
        event.preventDefault(); // mark event as handled.
    };

	render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
                ref={this.userNameInput}
                placeholder="username" 
                required/>
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
	
    constructor(props) {
        super(props);
        
        this.state = {
            data: [ 
            { name: "Abc", company: "B", avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4" },
            { name: "Def", company: "B", avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4" }
            ]
    };
  }
  
    addUser = (name) => {
        fetch(`https://api.github.com/users/${name}`)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState((state, props) => {
                let updated = state.data;
                updated.push({
                            name: result['name'],
                            company: result['company'],
                            avatar_url: result['avatar_url']
                        });
                return { data: updated };
            });
            },
            (error) => {
                alert(error);
            }
        );
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