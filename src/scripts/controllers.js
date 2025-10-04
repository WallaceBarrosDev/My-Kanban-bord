import { getAllCards } from "./api-localstore.js";
import { createCard } from "./events.js";

const cards = getAllCards();

export function controllerBord(bord) {
  const bodyBord = bord.querySelector(".body-bord");
  if (cards == null) return;

  cards.map((card, id) => {
    if(card.table != bodyBord.id) return;

    const newCard = createCard(card.title, card.description, `card-${id}`);
    bodyBord.appendChild(newCard);
  })
}

//document.createElement("div").(node)
