const protocolo = "http://";
const baseURL = "localhost:3000";

async function obtemFilmes() {
  const filmesEndpoint = "/filmes";
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  const filmes = (await axios.get(URLcompleta)).data;
  let tabela = document.querySelector(".filmes");
  //posicionar sobre o corpo da tabela pela sua tag
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  //para cada filme na lista de filmes, criar uma linha nova
  for (let filme of filmes) {
    let linha = corpoTabela.insertRow(0);
    let celulaTitulo = linha.insertCell(0);
    let celulaSinopse = linha.insertCell(1);
    celulaTitulo.innerHTML = filme.titulo;
    celulaSinopse.innerHTML = filme.sinopse;
  }
}

async function cadastrarFilme() {
  const filmesEndpoint = "/filmes";
  //montar a URL
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  //pegar os dados que o usuário digitou
  let tituloInput = document.querySelector("#tituloInput");
  let sinopseInput = document.querySelector("#sinopseInput");
  let titulo = tituloInput.value;
  let sinopse = sinopseInput.value;
  if (titulo && sinopse) {
    //limpa as caixinhas de input
    tituloInput.value = "";
    sinopseInput.value = "";
    //requisição post para o back, que devolve a lista de filmes atualizada
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;
    //limpa o corpo da tabela
    let tabela = document.querySelector(".filmes");
    let corpoTabela = tabela.getElementsByTagName("tbody")[0];
    corpoTabela.innerHTML = "";
    //remontando a tabela
    for (let filme of filmes) {
      let linha = corpoTabela.insertRow(0);
      let celulaTitulo = linha.insertCell(0);
      let celulaSinopse = linha.insertCell(1);
      celulaTitulo.innerHTML = filme.titulo;
      celulaSinopse.innerHTML = filme.sinopse;
    }
  }
  else {
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
        alert.classList.add('d-none')
        alert.classList.remove('show')
    }, 2000)
  }
}
async function cadastrarUsuario() {
  //navegar na árvore DOM até os inputs
  let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
  //captura os valores digitados
  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value
  if (usuarioCadastro && passwordCadastro) {
    //cadastrar usuário, utilizando controle de fluxos
    try {
      let cadastroEndpoint = '/signup'
      let URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
      await axios.post(URLcompleta, {login: usuarioCadastro, password: passwordCadastro})
      //limpa as caixinhas
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""
      let alert = document.querySelector('.alert-modal-cadastro')
      alert.innerHTML = "Usuário cadastrado com sucesso!"
      alert.classList.add('show', 'alert-success')
      alert.classList.remove('d-none', 'alert-danger')
      setTimeout(() => {
        alert.classList.add('d-none')
        alert.classList.remove('show')
        //fechar o modal
        let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
        modalCadastro.hide()
      }, 2000)
    }
    catch (erro) {

    }
  }
  else {
    //exibir alerta para digitar campos
    let alert = document.querySelector('.alert-modal-cadastro')
    alert.innerHTML = "Preencha todos os campos!"
    alert.classList.add('show', 'alert-danger')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.add('d-none')
      alert.classList.remove('show')
    }, 2000)
  }
  
}