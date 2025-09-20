const cards = document.querySelectorAll('.card');
const bords = document.querySelectorAll('.bord');
const modal = document.querySelector('.modal');
const inputTitle = modal.querySelector('input');
const inputDescription = modal.querySelector('textarea');
const myCustonEvent = new Event('myCustonEvent');

function addStoregeCards() {
  bords.forEach((bord, index) => {
    const bodyBord = bord.querySelector('.body-bord');
    const cards = getCards();
    cards.forEach(card => {
      if (card.state == index + 1) {
        bodyBord.appendChild(createCard(card.Tile, card.Description));
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
      bodyBord.appendChild(createCard(inputTitle.value, inputDescription.value));
      storeCard(inputTitle.value, inputDescription.value, bodyBord.id);
      clsModal();
      bords.forEach(bord => {
        bord.dispatchEvent(myCustonEvent);
      })
    };
  });
}

function createCard(title, description) {
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

  dragendCard(card);
  btnCard(card);
  optButton(card);

  return card;
}

function optButton(card) {
  const opt = card.querySelector('.opt');

  const exclude = opt.querySelector('button:last-child');
  exclude.addEventListener('click', () => {
    card.remove();
    bords.forEach(bord => {
      bord.dispatchEvent(myCustonEvent);
    })
  })

  const edit = opt.querySelector('button:first-child');
  edit.addEventListener('click', () => {
    inputTitle.value = card.querySelector('h2').textContent;
    inputDescription.value = card.querySelector('p').textContent;
    modal.style.display = 'flex';
    modal.querySelector('button:first-child').addEventListener('click', () => {
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
function dragendCard(card) {
  card.draggable = true;

  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  })

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    bords.forEach(bord => {
      bord.dispatchEvent(myCustonEvent);
    })
  })
}

function draggingBody(bord) {
  const bodyBord = bord.querySelector('.body-bord');

  bord.addEventListener('myCustonEvent', () => {
    const amoutCards = bodyBord.querySelectorAll('.card').length;
    const amoutText = bord.querySelector('.header-bord > span');
    amoutText.textContent = amoutCards;
  })

  bord.dispatchEvent(myCustonEvent);

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

function storeCard(Tile, Description, state) {
  const length = localStorage.length;

  const card = {
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
    cards.push(card);
  }
  return cards;
}
