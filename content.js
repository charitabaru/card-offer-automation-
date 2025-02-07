function detectOffers() {
  const offers = [];

  // Look for specific elements that might contain offers
  const offerElements = document.querySelectorAll('.offer, .discount, .cashback, .promo');
  offerElements.forEach(element => {
    const offerText = element.innerText.toLowerCase();
    if (offerText.includes('cashback') || offerText.includes('discount')) {
      offers.push({
        type: offerText.includes('cashback') ? 'cashback' : 'discount',
        value: '10%', // Extract actual value if possible
        description: element.innerText.trim()
      });
    }
  });

  // Send detected offers to the popup
  if (offers.length > 0) {
    try {
      chrome.runtime.sendMessage({ action: 'updateOffers', offers: offers });
    } catch (error) {
      console.error('Error sending offers:', error);
    }
  }
}

// Wait for the page to fully load
window.addEventListener('load', function () {
  detectOffers();
});

// Observe changes in the DOM (for dynamically loaded content)
const observer = new MutationObserver(detectOffers);
observer.observe(document.body, { childList: true, subtree: true });