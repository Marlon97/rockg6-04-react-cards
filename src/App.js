import React from 'react';
import './App.css';

const CardCorner = (props) => {
  return <div className="card-corner">
    <div>{props.number}</div>
    <div>{props.symbol}</div>
  </div>
}

const CardSymbols = (props) => {
  const isNumber = !isNaN(props.number);
  console.log(props.number + " es " + isNumber)
  return <div className="symbols">
    {
      (props.number === 'A') ? <div>{props.symbol}</div> :
      (
        isNumber ? new Array(parseInt(props.number)).fill(props.symbol).map(
            (cardSymbol, index) => <div key={index}>{cardSymbol}</div>
        ):
        (
          ['J','Q','K'].includes(props.number)? (<div className='image'></div>) : ''
        )
      )
    }
  </div>
}

const CardFront = (props) => {
  return <div className="front">
    <CardCorner symbol={props.symbol} number={props.number} />
    <CardSymbols symbol={props.symbol} number={props.number}/>
    <CardCorner symbol={props.symbol} number={props.number} />
  </div>
}

const Card = (props) => {
  return <div className="card" symbol={props.symbol} number={props.number}>
    <div className="container">
      <CardFront symbol={props.symbol} number={props.number}/>
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
        <Deck title="Table" path="table" flipped={2}></Deck>
        <Deck title="Hand" path="deck/2" flipped={2}></Deck>
      </header>
    </div>
  );
}

export default App;
