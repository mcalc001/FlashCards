import React, { Component } from 'react';
import Card from './Card/Card'
import './App.css';
import DrawButton from './DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';
import {DB_CONFIG} from './Config/Firebase/Db_config';



class App extends Component {
  constructor(props){
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG)
    this.database = this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    }
  }
  // conection to Firebase database, updates state with random card from database 
componentWillMount(){
  const currentCards = this.state.cards;
   this.database.on('child_added', snap => {
    currentCards.push({
      id: snap.key,
      answer: snap.val().answer,
      question: snap.val().question,
    })
     this.setState({
     cards: currentCards,
     currentCard: this.getRandomCard(currentCards)
  })
   })

 
}
//generates random card 
getRandomCard(currentCards){
  var card = currentCards[Math.floor(Math.random() * currentCards.length)]
  return (card);
}

// triggered by passing function in Drawbutton.js (function- drawcard)
// updates state with randomly selected card
updateCard(){
  const currentCards = this.state.cards
  this.setState({
    currentCard: this.getRandomCard(currentCards)
  })
}


  render() {
    return (
      <div className="App">
      <div className="cardRow">
      <Card question={this.state.currentCard.question}
            answer={this.state.currentCard.answer}
        />
      </div>
        <div className="btnRow"> 
        <DrawButton drawCard={this.updateCard}/>
        </div>
      </div>
    );
  }
}

export default App;
