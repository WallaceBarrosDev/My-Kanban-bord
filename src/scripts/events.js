import { draggingCard } from "./dragdrop.js"

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

    modal.querySelector('#save').addEventListener('click', () => {
      card.querySelector('h2').textContent = modal.querySelector('input').value;
      card.querySelector('p').textContent = modal.querySelector('textarea').value;
      modalAdd.style.display = 'block';
      modalSave.style.display = 'none';
      modal.style.display = 'none';
      clsModal(modal);
    });
  });

  exclude.addEventListener('click', () => {
    card.remove();
  });
}

function createCard(title, description, id) {
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

const addNewCardInModal = bord => btnAdd.onclick = () => {
  const newCard = createCard(
    cardTitleModal.value,
    cardDescriptionModal.value,
    'card-'+localStorage.length
  );

  bord.querySelector('.body-bord').appendChild(newCard);
  modal.style.display = 'none';
  clsModal();
};

const cancelModal = () => btnCancel.addEventListener('click', () => {
  modal.style.display = 'none';
  btnAdd.style.display = 'block';
  btnSave.style.display = 'none';
  clsModal();
});
