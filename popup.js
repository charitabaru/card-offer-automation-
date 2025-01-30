// Load saved cards when the popup opens
document.addEventListener('DOMContentLoaded', function () {
    loadCards();
  });
  
  // Add a new credit card
  document.getElementById('add-card').addEventListener('click', function () {
    const cardName = prompt('Enter your credit card name:');
    if (cardName) {
      saveCard(cardName);
      loadCards();
    }
  });
  
  // Save card to Chrome storage
  function saveCard(cardName) {
    chrome.storage.sync.get({ cards: [] }, function (data) {
      const cards = data.cards;
      cards.push(cardName);
      chrome.storage.sync.set({ cards: cards });
    });
  }
  
  // Load cards from Chrome storage
  function loadCards() {
    chrome.storage.sync.get({ cards: [] }, function (data) {
      const cardList = document.getElementById('card-list');
      cardList.innerHTML = '';
      data.cards.forEach(function (card) {
        const cardElement = document.createElement('div');
        cardElement.textContent = card;
        cardList.appendChild(cardElement);
      });
    });
  }