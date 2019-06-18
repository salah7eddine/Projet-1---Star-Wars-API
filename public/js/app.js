const table = document.getElementById('table');
const pagination = document.getElementById('pagination');
const previous = document.getElementById('prev');
const next = document.getElementById('next');
const searchBtn = document.getElementById('searchForm');

const url = "https://swapi.co/api/people/?format=json&page=1";

var dataArray;
var dataSort;


/*
  D : Default
  M : Mass
  H : Height
*/

var typeSort = 'D';



function getAllUsers() {
  typeSort = 'D';
  getUsers(url);
}

function getUsers(url) {
  axios
    .get(url)
    .then(resp => {

      infoUsers = resp.data;

      if (infoUsers) {
        searchBtn.classList.remove("searchForm");
      } else {
        searchBtn.classList.add("searchForm");
      }

      if (typeSort === 'N') {
        GetUserOrderByName();
      } else if (typeSort === 'H') {
        GetUserOrderByHeight();
      } else if (typeSort === 'M') {
        GetUserOrderByMass();
      } else if (typeSort === 'D') {
        addLignes(infoUsers.results);
      }

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

// Show Lines of Data
function addLignes(infoUsers) {

  let output = "";

  $.each(infoUsers, (index, users) => {
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
  if (typeSort === 'N') {
    GetUserOrderByName();
  } else if (typeSort === 'H') {
    GetUserOrderByHeight();
  } else if (typeSort === 'M') {
    GetUserOrderByMass();
  } else if (typeSort === 'D') {
    addLignes(infoUsers.results);
  }


}

function showNext() {
  getUsers(infoUsers.next);

}


// Sort Order By Name
function GetUserOrderByName() {
  typeSort = 'N';
  dataArray = Object.keys(infoUsers.results).map(i => infoUsers.results[i]);
  dataSort = dataArray.sort(funSortByName);
  addLignes(dataSort);
}

// function that Order the data by name
function funSortByName(a, b) {
  return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
}

// Sort Order By Height
function GetUserOrderByHeight() {
  typeSort = 'H';
  dataArray = Object.keys(infoUsers.results).map(i => infoUsers.results[i]);

  dataSort = dataArray.sort((a, b) => a.height - b.height);
  addLignes(dataSort);
}

// Sort Order By Mass
function GetUserOrderByMass() {
  typeSort = 'M';
  dataArray = Object.keys(infoUsers.results).map(i => infoUsers.results[i]);

  dataSort = dataArray.sort((a, b) => a.mass - b.mass);
  addLignes(dataSort);
}


