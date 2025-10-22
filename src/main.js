import { draggingBord } from "./scripts/dragdrop.js"
import { bordEvents, amountCardEvent } from "./scripts/events.js"
import { controllerBord } from "./scripts/controllers.js";
export const updateAmountCard = new Event('updateAmountCard');
export const url = 'http://localhost:3000/card';

const bords = document.querySelectorAll('.bord');
const modal = document.querySelector('.modal');

bords.forEach(bord => {
  controllerBord(bord)
  draggingBord(bord);
  bordEvents(bord, modal);
  amountCardEvent(bord);
})

document.dispatchEvent(updateAmountCard);
