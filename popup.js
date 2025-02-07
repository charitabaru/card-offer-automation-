document.addEventListener('DOMContentLoaded', function () {
  loadCards();
  setupAddCardListener();
  setupOfferListener();
});

// Setup add card listener
function setupAddCardListener() {
  const addCardButton = document.getElementById('add-card');
  if (addCardButton) {
    addCardButton.addEventListener('click', function () {
      const cardName = prompt('Enter your credit card name:');
      if (cardName) {
        saveCard(cardName);
      }
    });
  }
}

// Save card to Chrome storage
function saveCard(cardName) {
  chrome.storage.sync.get({ cards: [] }, function (data) {
    const cards = data.cards;
    cards.push(cardName);
    chrome.storage.sync.set({ cards: cards }, function () {
      loadCards(); // Reload cards after saving
    });
  });
}

// Load cards from Chrome storage
function loadCards() {
  chrome.storage.sync.get({ cards: [] }, function (data) {
    const cardList = document.getElementById('card-list');
    if (cardList) {
      cardList.innerHTML = '<h3>Your Credit Cards</h3>';
      if (data.cards.length === 0) {
        cardList.innerHTML += '<p>No cards added yet.</p>';
      } else {
        data.cards.forEach(function (card) {
          const cardElement = document.createElement('div');
          cardElement.className = 'card-item';
          cardElement.textContent = card;
          cardList.appendChild(cardElement);
        });
      }
    }
  });
}

// Setup offer listener
function setupOfferListener() {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateOffers') {
      const offerList = document.getElementById('offer-list');
      if (offerList) {
        offerList.innerHTML = '<h3>Available Offers</h3>';
        if (request.offers.length === 0) {
          offerList.innerHTML += '<p>No offers detected.</p>';
        } else {
          request.offers.forEach(function (offer) {
            const offerCard = document.createElement('div');
            offerCard.className = 'offer-card';
            offerCard.innerHTML = `
              <h3>${offer.type.toUpperCase()}</h3>
              <p>${offer.description}</p>
            `;
            offerList.appendChild(offerCard);
          });
        }
      }
    }
  });
}