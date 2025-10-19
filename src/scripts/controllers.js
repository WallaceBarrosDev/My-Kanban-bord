import { getAllCards } from "./api-server.js";
import { createCard } from "./events.js";

const cards = await getAllCards();

export function controllerBord(bord) {
  const bodyBord = bord.querySelector(".body-bord");
  if (cards == null) return;

  cards.map((card) => {
    if(card.table_id != bodyBord.id) return;

    const newCard = createCard(card.title, card.description, `card-${card.id}`);
    bodyBord.appendChild(newCard);
  })
}
