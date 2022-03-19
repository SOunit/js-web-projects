import { localQuotes } from "./quotes.js";

type Quote = { text: string; author?: string };

const quoteContainer = document.getElementById(
  "quote-container"
) as HTMLDivElement;
const quoteText = document.getElementById("quote") as HTMLSpanElement;
const authorText = document.getElementById("author") as HTMLSpanElement;
const twitterBtn = document.getElementById("twitter") as HTMLButtonElement;
const newQuoteBtn = document.getElementById("new-quote") as HTMLButtonElement;
const loader = document.getElementById("loader") as HTMLDivElement;

let apiQuotes: Quote[] = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank and replace it with 'Unknown'
  if (quote.author) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = "Unknown";
  }

  // Check Quote length to determine style
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();

  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    complete();
  } catch (error) {
    alert(error);
  }
}

function newLocalQuote() {
  // Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `
  https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
// newLocalQuote();
