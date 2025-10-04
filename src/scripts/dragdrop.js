import { updateAmountCard } from "../main.js"

export function draggingCard(card) {
  card.draggable = true;

  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  })

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    document.dispatchEvent(updateAmountCard);
  })
}

export function draggingBord(bord) {
  const bodyBord = bord.querySelector('.body-bord');

  bord.addEventListener('myCustonEvent', () => {
    const amoutCards = bodyBord.querySelectorAll('.card').length;
    const amoutText = bord.querySelector('.header-bord > span');
    amoutText.textContent = amoutCards;
  })

  bodyBord.addEventListener('dragover', e => {
    e.preventDefault();
  })

  bodyBord.addEventListener('dragenter', () => {
    if (bodyBord.classList.contains('dragzone')) {
      bodyBord.classList.add('dragover');
    }
  })

  bodyBord.addEventListener('dragleave', () => {
    bodyBord.classList.remove('dragover');
  })

  bodyBord.addEventListener('drop', () => {
    if (bodyBord.classList.contains('dragzone')) {
      bodyBord.classList.remove('dragover');
      const cardDragging = document.querySelector('.dragging');
      bodyBord.appendChild(cardDragging);
    }
  })
}
