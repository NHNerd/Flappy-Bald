let topUsersMDB = null;

function fetchGetUsers() {
  return fetch('http://localhost:3000/', {
    method: 'GET', // HTTP-метод GET для получения данных
    headers: {
      'Content-Type': 'application/json', // set content type like JSON
    },
  })
    .then((response) => {
      return response.json(); // parsing to JSON
    })
    .then((users) => {
      // Обрабатываем полученные данные
      topUsersMDB = users;
      console.log('FETCH GET');
    })
    .catch((error) => {
      console.error('P I Z D E Z: ' + error);
    });
}

function fetchAddUser(newUser) {
  fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      console.log('Client MongoDB: New user is sent', user);
    })
    .catch((error) => {
      console.error('Client MongoDB: ' + error);
    });
}

export { topUsersMDB, fetchGetUsers, fetchAddUser };
// const name = 'S U K A';
// const score = 200;

// const newUser = { name, score };

// async function MongoAddAndGet() {
//   await fetchAddUser(newUser);
//   fetchGetUsers();
// }

// MongoAddAndGet();
