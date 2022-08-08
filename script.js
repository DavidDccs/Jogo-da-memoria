const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

let lockMode = false;
let firstCard = null;
let secondCard = null;


let techs =["css","facebook","html","instagram","javascript","reddit","tiktok","twitter", "google", "twitch"]

let cards = null;
startGame();


function startGame(){

cards = createCard(techs);
shuffleCards(cards);

initializeCards(cards);
}


function initializeCards(cards){
let gameBoard = document.getElementById("gameBoard");
gameBoard.innerHTML = '';
cards.forEach(card => {
 let cardElement = document.createElement('div');
 cardElement.id= card.id;
 cardElement.classList.add(CARD);
 cardElement.dataset.icon = card.icon;
createCardContent(card, cardElement)


cardElement.addEventListener('click', flipCard)
gameBoard.appendChild(cardElement)

});
}

function createCardContent(card, cardElement){

createCardFace(FRONT, card, cardElement)
createCardFace(BACK, card, cardElement)

}

function createCardFace(face, card, element){
let cardElementFace= document.createElement('div')
cardElementFace.classList.add(face);

if(face === FRONT){
let iconElement = document.createElement('img');
iconElement.classList.add(ICON);
iconElement.src = "./assets/" + card.icon + ".png";
cardElementFace.appendChild(iconElement)

}else{cardElementFace.innerHTML = "&lt/&gt"; }
element.appendChild(cardElementFace)
}


function shuffleCards (cards){
let currentIndex = cards.length;
let randomIndex = 0;
while(currentIndex != 0){

randomIndex= Math.floor(Math.random() * currentIndex);
currentIndex--;
[cards[randomIndex], cards[currentIndex]] = [cards [currentIndex], cards[randomIndex]]

}


}


createCard(techs);
function createCard(techs){
let cards = [];
for(let tech of techs){

cards.push(createPair(tech))

} 

return (cards.flatMap(pair=>pair))
}


function createPair(tech){

return [{
id: createId(tech),
icon: tech,
flipped: false,

},
{
  id: createId(tech),
  icon: tech,
  flipped: false,
  
  }]

}

function createId (tech){

return tech + parseInt(Math.random() *1000);

}

function flipCard(){
if(setCard(this.id)){
this.classList.add("flip")
if(secondCard){
if(checkMatch()){
clearCards();
if(checkGameOver()){
let gameOverLayer = document.getElementById("gameOver")
gameOverLayer.style.display = 'flex';

};
}else{
  setTimeout(() => {
    let firstCardView = document.getElementById(firstCard.id)
  let secondCardView = document.getElementById(secondCard.id)
  firstCardView.classList.remove("flip")
  secondCardView.classList.remove("flip")
  unflipCards();
  }, 1000);
  


}

}
}
}

function setCard(id){
let card = cards.filter(card=> card.id===id)[0];

if(card.flipped || lockMode){return false;}
if(!firstCard){firstCard = card; firstCard.flipped=true; return true;}else{secondCard = card; secondCard.flipped=true; lockMode= true; return true;}
}

function checkMatch(){
if(!firstCard || !secondCard ){return false;}

return (firstCard.icon === secondCard.icon);
}

function clearCards(){
firstCard = null;
secondCard = null;
lockMode = false;
}

function unflipCards(){
firstCard.flipped= false;
secondCard.flipped= false;
clearCards();

}

function checkGameOver(){
return cards.filter(card =>!card.flipped).length == 0;


}

function restart(){
  clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver")
gameOverLayer.style.display = 'none';

}