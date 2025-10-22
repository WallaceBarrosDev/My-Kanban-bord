export async function getAllCards(url) {
  try {
    const response = await fetch(url);
    const cards = await response.json();
    return cards;
  } catch (error) {
    console.log(error);
  }
}

export async function getCard(url, id) {
  try {
    const response = await fetch(`${url}/${id}`);
    const card = await response.json();
    return card;
  } catch (error) {
    console.log(error);
  }
}

export async function saveNewCard(url, newCard) {
  try {
    const response = await fetch(url, {
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

export async function updateCard(url, id, newCard) {
  try {
    const response = await fetch(`${url}/${id}`, {
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

export async function deleteCard(url, id) {
  try {
    await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    console.log('card deletado.');
  } catch (error) {
    console.log(error);
  }
}
