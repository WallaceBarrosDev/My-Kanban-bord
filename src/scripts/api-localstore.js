export function getCard(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function getAllCards() {
  const cards = [];

  for(let i = 0; i < localStorage.length; i++) {
    const card = JSON.parse(localStorage.getItem(`card-${i}`));
    cards.push(card)
  }

  return cards;
}

export function saveNewCard(newCard, newId) {
  localStorage.setItem(newId, JSON.stringify(newCard));
  console.log('novo card criado.');
}

export function updateCard(id, newCard) {
  localStorage.setItem(id, JSON.stringify(newCard));
  console.log('card atualizado.');
}

export function deleteCard(id) {
  localStorage.removeItem(id);
  console.log('card deletado.');
}
