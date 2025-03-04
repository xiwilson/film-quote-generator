function generateQuote(event) {
  event.preventDefault();

  new Typewriter("#quotes", {
    strings: ["I am your father"],
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

let filmFormElement = document.querySelector("#film-quote-generator");
filmFormElement.addEventListener("submit", generateQuote);
