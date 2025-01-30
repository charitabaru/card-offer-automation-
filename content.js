// Scan the page for offers
function scanForOffers() {
    const pageText = document.body.innerText;
    if (pageText.includes('cashback') || pageText.includes('discount')) {
      alert('Offer detected!');
    }
  }
  
  // Run the scanner when the page loads
  scanForOffers();