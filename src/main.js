import { draggingBord, draggingCard } from "./scripts/dragdrop.js"
import { bordEvents, buttonCardEvent, amountCardEvent } from "./scripts/events.js"
import { getCard, getAllCards, saveNewCard, updateCard, deleteCard } from "./scripts/api-localstore.js"
export const updateAmountCard = new Event('updateAmountCard');

const cards = document.querySelectorAll('.card');
const bords = document.querySelectorAll('.bord');
const modal = document.querySelector('.modal');

cards.forEach(card => {
  draggingCard(card);
  buttonCardEvent(card, modal);
});

bords.forEach(bord => {
  draggingBord(bord);
  bordEvents(bord, modal);
  amountCardEvent(bord);
})

document.dispatchEvent(updateAmountCard);
