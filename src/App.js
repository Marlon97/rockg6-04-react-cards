import React from 'react';
import './App.css';

const Card = () => {
  return <div className="">
    <div>
      <div></div>
      <div></div>
    </div>
  </div>

}

class Deck extends React.Component{

  state = {
    cards: []
  }

  componentDidMount() {
    (async () => {
      let cards = await (await fetch(`http://localhost:4001/${this.props.path}`)).json();
      this.setState({cards});
    })();
  }

  render() {
    return <div>
      <h3>{this.props.title}</h3>
      <div className="deck">{ JSON.stringify(this.state.cards) }</div>
    </div>;
  }

  /**constructor(props){
    super(props);
    (async () => {
      const cards = fetch(`http://localhost:4001/${props.path}`).then(data => data.json().then(data => {
        console.log(props.path, cards);
      }));
      console.log(`http://localhost:4001/${props.path}`, this.props.title, cards)
    })();
  }**/

}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Deck title="Table" path="table"></Deck>
        <Deck title="Hand" path="deck/2"></Deck>
      </header>
    </div>
  );
}

export default App;
