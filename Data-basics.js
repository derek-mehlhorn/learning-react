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

let data = [ 
    { name: "A", company: "B", avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4" },
    { name: "A", company: "B", avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4" }
];

const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card {...card}/>)}
    </div>
  );
}

ReactDOM.render(<CardList cards={data}/>, mountNode);