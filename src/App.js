import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [deck, setDeck] = useState("");
  const [card, setCard] = useState({ data: null, isLoading: true });
  console.log(card.data)
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
      setCard({data: drawnCard.data.cards[0], isLoading: false});
    }
    fetchCard();
  }, [card]);

  function drawCard() {
    setCard({ data: card, isLoading: true });
  }

  return (
    <div>
      <button onClick={drawCard}>
        Draw a Card!
      </button>
      {card.data===undefined ? <p>No More Cards!!!</p> : <img src={`${card.data.image}`} />}
    </div>
  );

}

export default App;
