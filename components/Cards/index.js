// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios
    .get("https://lambda-times-backend.herokuapp.com/articles")
    .then(response => {
        console.log(response);
        let cardContainer = document.querySelector(".cards-container");
        let carddata = Object.values(response.data.articles);
        carddata.forEach(element => {
            element.forEach(item => {
                cardContainer.appendChild(cardCreater(item));
            });
        });
    })
    .catch(error => {
        console.log(error);
    });

const cardCreater = response => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const headline = document.createElement("div");
    headline.classList.add("headline");
    headline.textContent = response.headline;
    newCard.appendChild(headline);

    const author = document.createElement("div");
    author.classList.add("author");
    newCard.appendChild(author);

    const image = document.createElement("div");
    image.classList.add("img-container");
    author.appendChild(image);

    const imageLink = document.createElement("img");
    imageLink.setAttribute("src", response.authorPhoto);
    image.appendChild(imageLink);

    const authorby = document.createElement("span");
    authorby.textContent = `By ${response.authorName}`;
    author.appendChild(authorby);

    return newCard;
};
console.log(cardCreater);