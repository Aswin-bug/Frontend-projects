const quoteBlock = document.getElementById("quote");
const authorBlock = document.getElementById("author");

async function getQuote() {
  try {
    const response = await fetch("http://api.quotable.io/random");
    let data = await response.json();
    quoteBlock.innerHTML = data.content;
    authorBlock.innerHTML = data.author;
  } catch (error) {
    console.error("Error in fetching quote", error);
  }
}

function callTwitter() {
  window.open(
    "https://twitter.com/intent/tweet?text=" + quoteBlock.innerHTML + " --- by " + authorBlock.innerHTML,
    "tweet window", //names the popup window , it can be anything or  _blank
    "width=500,height=500"
  );
}

window.onload(getQuote());
