/*

* get quotes from outside source (api for quotes)
* you could also get quotes lacally (so you can customize the quotes)
* https://quotes-react.netlify.app
they are objects in an array
* we'll have to take array, store it and pick a randon one when press new quote button

 */

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// ? use names for the function that describe whattehy're doing, less comments needed
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// ? Show random new quote with Math.random() and Math.floor()
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // ? when author is empty (null)  then show Unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // ? when quote is very long then reduce size font in CSS
  if (quote.text.length > 113) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // ? Quote showing andd hiding loader
  quoteText.textContent = quote.text;
  //console.log(quote);
  removeLoadingSpinner();
}

// ? Get quotes from API, here we could of named faunction: getQuopeFromApi
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    //console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    // ?catch error
    alert("Sorry, something went wrong!");
  }
}

// ? Tweet the quote, let op de backticks en niet aanhalingstekens om variable in te voegen, queries parameters op website Twitter te vinden
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// ? event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// ? on load
getQuotes();
