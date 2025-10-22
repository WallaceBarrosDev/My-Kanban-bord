import { draggingCard } from "./dragdrop.js"
import { updateAmountCard, url } from "../main.js"
//import { deleteCard, saveNewCard, updateCard } from "./api-localstore.js"
import { deleteCard, saveNewCard, updateCard } from "./api-server.js";

const modal = document.querySelector('.modal');
const cardTitleModal = modal.querySelector('input');
const cardDescriptionModal = modal.querySelector('textarea');
const btnAdd = modal.querySelector('#add');
const btnSave = modal.querySelector('#save');
const btnCancel = modal.querySelector('#cancel');

export function bordEvents(bord) {
  const addNewCard = bord.querySelector('.addCard');
  cancelModal();

  addNewCard.addEventListener('click', () => {
    modal.style.display = 'flex';
    addNewCardInModal(bord);
  });
}

export function amountCardEvent(bord) {
  document.addEventListener('updateAmountCard', () => {
    const amountCard = bord.querySelector('.header-bord > span');
    const amount = bord.querySelectorAll('.card').length;
    amountCard.textContent = amount;
  });
}

export function buttonCardEvent(card) {
  const btn = card.querySelector('button');
  const opt = card.querySelector('.opt');

  btn.addEventListener('click', () => {
    opt.classList.toggle('active');
  });

  const edit = opt.querySelector('button:first-child');
  const exclude = opt.querySelector('button:last-child');

  edit.addEventListener('click', () => {
    const modalAdd = modal.querySelector('#add');
    const modalSave = modal.querySelector('#save');

    modal.style.display = 'flex';

    modal.querySelector('input').value = card.querySelector('h2').textContent;
    modal.querySelector('textarea').value = card.querySelector('p').textContent;
    modalAdd.style.display = 'none';
    modalSave.style.display = 'block';

    modalSave.addEventListener('click', () => {
      updateElementCard(card);

      card.querySelector('h2').textContent = modal.querySelector('input').value;
      card.querySelector('p').textContent = modal.querySelector('textarea').value;
      modalAdd.style.display = 'block';
      modalSave.style.display = 'none';
      modal.style.display = 'none';
      clsModal(modal);
    });

    document.dispatchEvent(updateAmountCard);
  });

  exclude.addEventListener('click', () => {
    const id = parseInt(card.id.replace('card-', ''));
    deleteCard(url, id);
    card.remove();
    document.dispatchEvent(updateAmountCard);
  });
}

export function createCard(title, description, id) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <button>...</button>
    <div class="opt">
      <button>Editar</button>
      <button>Excluir</button>
    </div>
  `;

  card.id = id;
  draggingCard(card);
  buttonCardEvent(card);

  return card;
}

export function clsModal () {
  cardTitleModal.value = '';
  cardDescriptionModal.value = '';
}

const addNewCardInModal = async bord => btnAdd.onclick = async () => {
  const newCard = {
    title: cardTitleModal.value,
    description: cardDescriptionModal.value,
    table_id: bord.querySelector('.body-bord').id  
  }

  const newId = await saveNewCard(url, newCard);

  const newCardElement = createCard(newCard.title, newCard.description, newId)
  bord.querySelector('.body-bord').appendChild(newCardElement);
  modal.style.display = 'none';
  clsModal();
  document.dispatchEvent(updateAmountCard);
};

const cancelModal = () => btnCancel.addEventListener('click', () => {
  modal.style.display = 'none';
  btnAdd.style.display = 'block';
  btnSave.style.display = 'none';
  clsModal();
});

export function updateElementCard(card) {
  const newCard = {
    title: card.querySelector('h2').textContent,
    description: card.querySelector('p').textContent,
    table_id: parseInt(card.parentElement.id)  
  }
  const id = parseInt(card.id.replace('card-', ''));

  updateCard(url, id, newCard);
}
