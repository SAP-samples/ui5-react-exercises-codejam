export const getBookList = async () => {
  const response = await fetch('/browse/Books?$expand=genre', {
    method: `GET`,
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const submitOrder = async (bookId, quantity) => {
  const response = await fetch('/browse/submitOrder', {
    method: `POST`,
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      book: bookId,
      quantity: quantity,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Something went wrong.');
    })
    .then(function (results) {
      return results;
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

  return response;
};
