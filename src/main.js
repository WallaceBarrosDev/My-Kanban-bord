import { draggingBord, draggingCard } from "./scripts/dragdrop.js"
import { bordEvents, buttonCardEvent } from "./scripts/events.js"
import { getCard, getAllCards, saveNewCard, updateCard, deleteCard } from "./scripts/api-localstore.js"

const cards = document.querySelectorAll('.card');
const bords = document.querySelectorAll('.bord');
const modal = document.querySelector('.modal');

deleteCard('card-1');
console.log(getAllCards());

cards.forEach(card => {
  draggingCard(card);
  buttonCardEvent(card, modal);
})

bords.forEach(bord => {
  draggingBord(bord);
  bordEvents(bord, modal);
})

// ==> OLD <== //

/*
const modal = document.querySelector('.modal');
const inputTitle = modal.querySelector('input');
const inputDescription = modal.querySelector('textarea');
const myCustonEvent = new Event('myCustonEvent');

function addStoregeCards() {
  const cards = getCards();
  bords.forEach((bord, index) => {
    const bodyBord = bord.querySelector('.body-bord');
    cards.forEach(card => {
      if (card.state == index + 1) {
        bodyBord.appendChild(createCard(card.Tile, card.Description, 'card-'+card.id));
      }
    })
  })
}

addStoregeCards();

cards.forEach(card => {
  dragendCard(card);
  btnCard(card);
  optButton(card);
})

bords.forEach(bord => {
  draggingBody(bord);

  const bodyBord = bord.querySelector('.body-bord');
  const btn = bord.querySelector('.addCard');
 addCard(btn, bodyBord);
})

modal.querySelector('button:last-child').addEventListener('click', () => {
  modal.style.display = 'none';
  clsModal();
})

function clsModal () {
  inputTitle.value = '';
  inputDescription.value = '';
  modal.style.display = 'none';
}

// Create new card
function addCard(btn, bodyBord) {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.querySelector('button:first-child').onclick = () => {
      bodyBord.appendChild(createCard(inputTitle.value, inputDescription.value, 'card-'+localStorage.length));
      storeCard(inputTitle.value, inputDescription.value, bodyBord.id);
      console.log("teste")
      clsModal();
      bords.forEach(bord => {
        bord.dispatchEvent(myCustonEvent);
      })
    };
  });
}

function optButton(card) {
  const opt = card.querySelector('.opt');

  const exclude = opt.querySelector('button:last-child');
  exclude.addEventListener('click', () => {
    card.remove();
    deleteCard(card.id);
    bords.forEach(bord => {
      bord.dispatchEvent(myCustonEvent);
    })
  })

  const edit = opt.querySelector('button:first-child');
  edit.addEventListener('click', () => {
    inputTitle.value = card.querySelector('h2').textContent;
    inputDescription.value = card.querySelector('p').textContent;
    const btnsave = document.querySelector('#save');
    btnsave.addEventListener('click', () => {
      const id = parseInt(card.id.split('-')[1]);
      const newCard = JSON.stringify({
        id: id,
        Tile: card.querySelector('h2').textContent || '',
        Description: card.querySelector('p').textContent || '',
        state: card.parentElement.id
      });
      console.log(newCard);
      localStorage.setItem(card.id, newCard);
      card.querySelector('h2').textContent = inputTitle.value;
      card.querySelector('p').textContent = inputDescription.value;
      clsModal();
    }, {once: true});
  });
}

function btnCard(card) {
  const btn = card.querySelector('button');
  btn.addEventListener('click', () => {
    const opt = card.querySelector('.opt');
    opt.classList.toggle('active');
  });
}

// Drag and Drop

function draggingBody(bord) {
}

function storeCard(Tile, Description, state) {
  const length = localStorage.length;

  const card = {
    id: length,
    Tile,
    Description,
    state
  }
  console.log(JSON.stringify(card));

  localStorage.setItem('card-' + length, JSON.stringify(card));
}

function getCards() {
  const cards = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const card = JSON.parse(localStorage.getItem(key));
    cards[i] = card;
  }
  return cards;
}

// a função deve deletar o card do localStorage
function deleteCard(id) {
  localStorage.removeItem(id);
}
*/
