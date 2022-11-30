import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [deck, setDeck] = useState("");
  const [card, setCard] = useState("");

  useEffect(function fetchDeckOfCard() {
    async function fetchDeck() {
      const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeck(deckResult.data.deck_id);
    }
    fetchDeck();
  }, []);

  useEffect(function fetchNewCard() {
    async function fetchCard() {
      const drawnCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
      setCard(drawnCard.data.cards[0].image);
    }
    fetchCard();
  },[]);

  function drawCard() {
    setCard(card);
  }

  return (
    <div>
      <button onClick={drawCard}>
        Draw a Card!
      </button>
      {card ?  <img src={`${card}`}/> : <p>No More Cards!!!</p> }
    </div>
  );

}

export default App;
