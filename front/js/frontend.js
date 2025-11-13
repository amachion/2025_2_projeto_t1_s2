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
    exibirAlerta ('.alert-filme', 'Filme cadastrado com sucesso!!!', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
  }
  else {
    exibirAlerta ('.alert-filme', 'Preencha todos os campos!!!', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
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

      exibirAlerta ('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
      esconderModal ('#modalCadastro', 2000)
    }
    catch (erro) {
      exibirAlerta ('.alert-modal-cadastro', "Usuário já existe!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
      esconderModal ('#modalCadastro', 2000)
    }
  }
  else {
    //exibir alerta para digitar campos
    exibirAlerta ('.alert-modal-cadastro', "Preencha todos os campos!!!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
  }
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
  let alert = document.querySelector(seletor)
  alert.innerHTML = innerHTML
  alert.classList.add(...classesToAdd)
  alert.classList.remove(...classesToRemove)
  setTimeout(() => {
    alert.classList.add(...classesToRemove)
    alert.classList.remove(...classesToAdd)
  }, timeout)
}

function esconderModal (seletor, timeout) {
  setTimeout (() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
  }, timeout)
}

const fazerLogin = async () => {
  //1. posicionar nos inputs do modal de login
  let usuarioLoginInput = document.querySelector("#usuarioLoginInput")
  let passwordLoginInput = document.querySelector("#passwordLoginInput")
  //2. capturar os valores digitados
  let usuarioLogin = usuarioLoginInput.value
  let passwordLogin = passwordLoginInput.value
  //3. verificar se os campos foram preenchidos
  if (usuarioLogin && passwordLogin) {
    try {
      //4. montar a URL para requisição
      const loginEndpoint = '/login'
      const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
      //5. enviar a requisição e capturamos a resposta
      const response = await axios.post (URLcompleta, {login: usuarioLogin, password: passwordLogin})
      console.log (response.data)
      //6. limpar os inputs
      usuarioLoginInput.value = ""
      passwordLoginInput.value = ""
      exibirAlerta ('.alert-modal-login', 'Login realizado com sucesso!!!', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
      esconderModal('#modalLogin', 2000)
      //7. habilitar o botão de cadastro de filmes
      let cadastrarFilmeButton = document.querySelector("#cadastrarFilmeButton")
      cadastrarFilmeButton.disabled = false
      //8. alterar o texto do botão de login para logout
      let loginLink = document.querySelector("#loginLink")
      loginLink.innerHTML = "Logout"
    }
    catch (error) {
      exibirAlerta ('.alert-modal-login', 'Falha no login!!!', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
  }
  else {
    exibirAlerta('.alert-modal-login', 'Preencha todos os campos!!!', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
  }
}