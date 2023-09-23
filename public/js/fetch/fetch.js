export function fetchGetUsers() {
  fetch('http://localhost:3000/', {
    method: 'GET', // HTTP-метод GET для получения данных
    headers: {
      'Content-Type': 'application/json', // set content type like JSON
    },
  })
    .then((response) => response.json()) // parsing to JSON
    .then((data) => {
      // Обрабатываем полученные данные
      console.log(data);
    })
    .catch((error) => {
      console.error('P I Z D E Z:   ' + error);
    });
}
