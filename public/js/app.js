const table = document.getElementById('table');
const pagination = document.getElementById('pagination');
const previous = document.getElementById('prev');
const next = document.getElementById('next');

const url = "https://swapi.co/api/people/?format=json&page=1";

function getAllUsers() {

  getUsers(url);
}

function getUsers(url) {
  axios
    .get(url)
    .then(resp => {

      infoUsers = resp.data;

      addLignes(infoUsers);

      if (infoUsers.next) {
        next.classList.remove("removeBtn");
      } else {
        next.classList.add("removeBtn");
      }

      if (infoUsers.previous) {
        previous.classList.remove("removeBtn");
      } else {
        previous.classList.add("removeBtn");
      }

      document.getElementById('table').style.visibility = 'visible';
    })
    .catch(err => {
      console.log(err);
    });
};


function addLignes(infoUsers) {
  let output = "";
  $.each(infoUsers.results, (index, users) => {
    if (index % 2 == 0) {
      output += `
            <tr class="table-active" >
              <th scope="row">${users.name}</th>
              <td>${users.height}</td>
              <td>${users.mass}</td>
              <td>${users.hair_color}</td>
              <td>${users.skin_color}</td>
              <td>${users.eye_color}</td>
              <td>${users.birth_year}</td>
              <td>${users.gender}</td>
              <td>${new Date(users.created).getDate()}/${new Date(users.created).getMonth()}/${new Date(users.created).getFullYear()} </td>
              <td>${new Date(users.edited).getDate()}/${new Date(users.edited).getMonth()}/${new Date(users.edited).getFullYear()} </td>
            </tr>
          `;
    } else {
      output += `
              <tr>
                <th scope="row">${users.name}</th>
                <td>${users.height}</td>
                <td>${users.mass}</td>
                <td>${users.hair_color}</td>
                <td>${users.skin_color}</td>
                <td>${users.eye_color}</td>
                <td>${users.birth_year}</td>
                <td>${users.gender}</td>
                <td>${new Date(users.created).getDate()}/${new Date(users.created).getMonth()}/${new Date(users.created).getFullYear()} </td>
                <td>${new Date(users.edited).getDate()}/${new Date(users.edited).getMonth()}/${new Date(users.edited).getFullYear()} </td>
              </tr>
          `;
    }
  });

  $("#users").html(output);
}

function showPrevious() {
  getUsers(infoUsers.previous);
}

function showNext() {
  getUsers(infoUsers.next);
}