export async function getAllCards() {
  try {
    const response = await fetch('http://localhost:3000');
    const cards = await response.json();
    return cards;
  } catch (error) {
    console.log(error);
  }
}

export async function getCard(id) {
  try {
    const response = await fetch(`http://localhost:3000/${id}`);
    const card = await response.json();
    return card;
  } catch (error) {
    console.log(error);
  }
}

export async function saveNewCard(newCard) {
  try {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCard)
    });
    const result = await response.json();
    console.log(result.message);
    return result.id;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCard(id, newCard) {
  try {
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCard)
    });
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCard(id) {
  try {
    await fetch(`http://localhost:3000/${id}`, {
      method: 'DELETE'
    });
    console.log('card deletado.');
  } catch (error) {
    console.log(error);
  }
}
