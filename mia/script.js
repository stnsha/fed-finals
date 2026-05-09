const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

function showRandomQuote(quotes) {
  const random = quotes[Math.floor(Math.random() * quotes.length)];

  // trigger fade-out
  quoteText.classList.remove("show");
  quoteAuthor.classList.remove("show");

  setTimeout(() => {
    quoteText.textContent = `"${random.quote}"`;
    quoteAuthor.textContent = `— ${random.author}`;

    // fade-in
    quoteText.classList.add("show");
    quoteAuthor.classList.add("show");
  }, 300);
}

fetch("https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw")
  .then(res => res.json())
  .then(data => {
    showRandomQuote(data.quotes);

    // change quote every 5 seconds
    setInterval(() => {
      showRandomQuote(data.quotes);
    }, 5000);
  })
  .catch(err => console.error(err));