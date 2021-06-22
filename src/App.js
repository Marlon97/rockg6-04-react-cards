import React from 'react';
import './App.css';

const Card = (props) => {
  return <div className="card" symbol={props.symbol} number={props.number}>
    <div className="container">
      <div className="front">
        {props.symbol}
        {props.number}
      </div>
      <div className="back"></div>
    </div>
  </div>

}

class Deck extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    (async () => {
      setTimeout( async () => {
        let cards = await (await fetch(`http://localhost:4001/${this.props.path}`)).json();
        this.setState({cards});
      },2000);
    })();
  }

  render() {
    return <div>
      { (this.state.cards.length === 0) ? <div>Loading...</div> :
          <div>
            <h2>{this.props.title}</h2>
            <div className="deck">{
              this.state.cards.map((card, index) => {
                const number = card.slice(0, -1);
                const symbol = card.slice(-1);
                return <Card symbol={symbol} number={number} key={index}/>
              })
            }</div>
          </div>
      }
    </div>;
  }

}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Deck.js React Version</h1>
        <Deck title="Table" path="table"></Deck>
        <Deck title="Hand" path="deck/2"></Deck>
      </header>
    </div>
  );
}

export default App;
