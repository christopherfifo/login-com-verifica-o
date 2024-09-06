//!trocar de lado

const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");
const container = document.getElementById("container");

registerbtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

//! vericação

// Seleciona elementos do DOM
const form = document.getElementById("form");
const campos = document.querySelectorAll(".required");
const span = document.querySelectorAll(".error_span");
const validarRegistro = document.getElementById("vali_register");
const validarLogin = document.getElementById("vali_login");
const inputs_login = document.querySelectorAll(".inputs_login");
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Funções de validação
const validators = [
  (value) => value.length >= 3 || "O nome deve ter pelo menos 3 caracteres.",
  (value) => emailRegex.test(value) || "Email inválido.",
  (value) =>
    value.length >= 11 || "O número deve ter pelo menos 11 caracteres.",
  (value) => {
    if (value.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
    if (!/[A-Z]/.test(value))
      return "A senha deve ter pelo menos uma letra maiúscula.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "A senha deve ter pelo menos um caractere especial.";
    return true;
  },
  (value, campos) => {
    if (value === "") return "Campo Obrigatório";
    if (value !== campos[3].value) return "As senhas não coincidem.";
    return true;
  },
];

// Funções de manipulação de erros
function setError(index, message) {
  campos[index].style.border = "2px solid red";
  span[index].style.display = "block";
  span[index].textContent = message; // o texto mandado pela validações
}

function removeError(index) {
  campos[index].style.border = "2px solid green";
  span[index].style.display = "none";
}

// Validação de um campo específico
function validateField(index) {
  const field = campos[index];
  const validator = validators[index];
  const result = validator(field.value, campos); // to mandando todos os campos

  if (result === true) {
    removeError(index);
    return true;
  } else {
    setError(index, result);
    return false;
  }
}

// Valida todos os campos e executa a ação final
function validacaoFinal(event) {
  event.preventDefault(); // Impede o comportamento padrão do botão

  let formValido = true; // Variável para rastrear se o formulário é válido

  campos.forEach((campo, index) => {
    if (!validateField(index)) {
      formValido = false; // Define como falso se algum campo estiver inválido
    }
  });

  if (formValido) {
    alert("Formulário válido!"); // Substitua por sua ação final
  } else {
    alert("Formulário inválido!"); // Substitua por sua ação final
  }
}

// Adiciona os ouvintes de eventos
campos.forEach((campo, index) => {
  campo.addEventListener("input", () => validateField(index));
});

validarRegistro.addEventListener("click", validacaoFinal);

function validacaoLogin(event) {
  event.preventDefault();
  let formValido = "";

  inputs_login.forEach((inputs) => {
    if (inputs.value === "") {
      formValido = false;
    } else {
      formValido = true;
    }
  });

  if (formValido) {
    alert("Formulário válido!");
  } else {
    alert("Formulário inválido! Preencha todos os campos.");
  }
}

validarLogin.addEventListener("click", validacaoLogin);

//! trocar de tema

const obj = document.querySelectorAll(".obj");
const icon = document.getElementById("dark");

icon.addEventListener("click", respostaTema);

function respostaTema() {
  obj.forEach((element) => {
    element.classList.toggle("dark");
  });
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
}

//! local storege

document.addEventListener("DOMContentLoaded", function () {
  const accessInput = document.getElementById("accessInput");
  const rememberCheckbox = document.getElementById("rememberCheckbox");

  // Verifica se já existe uma forma de acesso salva no localStorage
  const savedAccess = localStorage.getItem("accessInfo");

  if (savedAccess) {
    accessInput.value = savedAccess;
    rememberCheckbox.checked = true;
  }

  // Adiciona um evento de mudança ao checkbox
  rememberCheckbox.addEventListener("change", function () {
    if (this.checked) {
      localStorage.setItem("accessInfo", accessInput.value);
    } else {
      localStorage.removeItem("accessInfo");
    }
  });

  // Atualiza o localStorage toda vez que o usuário digita no input
  accessInput.addEventListener("input", function () {
    if (rememberCheckbox.checked) {
      localStorage.setItem("accessInfo", this.value);
    }
  });
});

//! expor senha

document.querySelectorAll(".olhos").forEach(function (icon) {
  icon.addEventListener("click", function () {
    // Seleciona o input associado ao ícone clicado
    const input = this.previousElementSibling;

    // Alterna o tipo do input entre 'password' e 'text'
    if (input.type === "password") {
      input.type = "text";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    }
  });
});

//! mostrar o gerador de senha

const btnGerar = document.querySelector(".senha_btn");
const painelEsquerda = document.querySelector(".overlay-left");
const esquerdaElements = document.querySelectorAll(".gerador-local");
const gerador = document.querySelector(".senha_container");

let valido = false;

btnGerar.addEventListener("click", SenhaEspaco);

function SenhaEspaco(event) {
  event.preventDefault();

  const computedStyle = getComputedStyle(painelEsquerda);

  if (computedStyle.padding === "0px" || computedStyle.padding === "0px 0px") {
    painelEsquerda.style.padding = "0 40px";
  } else {
    painelEsquerda.style.padding = "0px";
  }

  valido = true;
  gerarGerador();
}

function gerarGerador() {
  if (valido) {
    esquerdaElements.forEach((element) => {
      const displayStyle = getComputedStyle(element).display;
      element.style.display = displayStyle === "none" ? "block" : "none"; //? getComputedStyle() retorna um objeto que contém os valores de todas as propriedades CSS de um elemento
    });

    const geradorDisplayStyle = getComputedStyle(gerador).display;
    gerador.style.display = geradorDisplayStyle === "none" ? "flex" : "none";
  } else {
    alert("erro");
  }
}

//! gerador de senhas

const senhaLinha = document.getElementById("senha-linha");
const senhaCaixa = document.getElementById("senha-caixa");
const senhaMostrar = document.getElementById("mostrar");
const btnGeraracao = document.getElementById("gerar");
const btnCopiar = document.getElementById("copiar");
const lugarPassword = document.getElementById("password");
const containerSenha = document.querySelector(".senha");
const inputSenha = document.querySelectorAll(".senha-marcavel");
const letramaiuscula = document.getElementById("maiscula");
const letraMinuscula = document.getElementById("minuscula");
const numero = document.getElementById("numero");
const simbolo = document.getElementById("simbolo");
const senhaCopyInputs = document.querySelectorAll(".senha-copy");

letraMinuscula.value = "abcdefghijklmnopqrstuvwxyz";
letramaiuscula.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
numero.value = "0123456789";
simbolo.value = "!@#$%&*()_+";

senhaLinha.oninput = function () {
  senhaMostrar.innerHTML = this.value;
  senhaCaixa.value = this.value;
};

senhaCaixa.oninput = function () {
  senhaMostrar.innerHTML = this.value;
  senhaLinha.value = this.value;
};

let novaSenha = "";
let senha = "";

btnGeraracao.addEventListener("click", geracaoSenha);

function geracaoSenha() {
  let cond = true;
  inputSenha.forEach(function (dados) {
    if (!dados.checked) {
      cond = false;
      return;
    }
  });

  if (cond) {
    senha = ""; // Resetar a senha a cada geração

    inputSenha.forEach(function (dados) {
      if (dados.checked) {
        senha += dados.value;
      }
    });

    let pass = "";

    for (let i = 0, n = senha.length; i < senhaLinha.value; i++) {
      pass += senha.charAt(Math.floor(Math.random() * n));
    }

    containerSenha.style.display = "flex";
    lugarPassword.innerHTML = pass;

    novaSenha = pass;
  } else {
    return;
  }
}

lugarPassword.addEventListener("click", function () {
  alert("Senha copiada com sucesso");
  navigator.clipboard.writeText(novaSenha);
});

//? passa o valor para os input

btnCopiar.addEventListener("click", function () {
  senhaCopyInputs.forEach(function (input) {
    input.value = novaSenha;
    removeError(3);
    removeError(4);
  });
  navigator.clipboard.writeText(novaSenha);
  if (
    painelEsquerda.style.padding === "0px" ||
    painelEsquerda.style.padding === ""
  ) {
    painelEsquerda.style.padding = "0 40px";
  } else {
    painelEsquerda.style.padding = "0px";
  }
  gerarGerador();
});
