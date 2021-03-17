let usuarios = [];
window.addEventListener("load",() => {
  getUsuarios();

  let txtBusca = document.querySelector("#txtBusca");
  let btnBuscar = document.querySelector("#btnBuscar");

  txtBusca.addEventListener('keyup', event => {
  if(event.key === 'Enter'){
    filtrarUsuarios(txtBusca.value);
  }
  });

  btnBuscar.addEventListener('click', () => filtrarUsuarios(txtBusca.value));
 
});

function filtrarUsuarios(valorFiltro){
  valorFiltro = valorFiltro.toLowerCase();
  if(valorFiltro.length > 0){
    let filtered = usuarios.filter(person => person.nome.toLowerCase().includes(valorFiltro));
    renderUsers(filtered);
    calculaEstatisticas(filtered);

  }
}

function calculaEstatisticas(filtered){
   let qtdUsersFound = filtered.length;
    let somaIdades = filtered.reduce((acc,cur) => { return acc + cur.idade; },0);

    document.getElementById("qtdUsersFound").textContent = qtdUsersFound;
    document.getElementById("qtdMasculino").textContent = filtered.filter(person => person.sexo === 'male').length;
    document.getElementById("qtdFeminino").textContent = filtered.filter(person => person.sexo === 'female').length;
    document.getElementById("somaIdades").textContent = somaIdades;
    document.getElementById("mediaIdades").textContent = somaIdades / qtdUsersFound;
}

function renderUsers(users){
    let countriesHTML = '<div>';

    users.forEach(country => {
      const { nome, picture, idade, sexo} = country;
  
      const countryHTML = `
        <div class='country'>
          <div>
            <img src="${picture}" alt="${nome}">
          </div>
          <div>
            <ul>
              <li>${nome}</li>
              <li>${idade}</li>
              <li>${sexo}</li>
            </ul>
          </div>
        </div>  
      `;
  
      countriesHTML += countryHTML;
    });
  
    countriesHTML += '</div>';
    tabCountries.innerHTML = countriesHTML;
  }


async function getUsuarios(){
  const res = await fetch('http://localhost:3001/users');
  const json = await res.json();
  //name (first + " " + last), picture (imagem), dob.age (idade) e gender (sexo)
  usuarios = json.map(user => {
    return {
       nome: user.name.first + ' ' + user.name.last,
       picture: user.picture.thumbnail,
       idade: user.dob.age,
       sexo: user.gender
    };
  });
  console.log(usuarios);
}