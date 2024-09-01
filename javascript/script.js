//!trocar de lado

const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');
const container = document.getElementById('container');

registerbtn.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

loginbtn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

//! vericação

const form = document.getElementById('form');
const campos = document.querySelectorAll(".required");
const span = document.querySelectorAll(".error_span");
const validarRegistro = document.getElementById("vali_register");
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validators = {
    0: value => value.length >= 3 || 'O nome deve ter pelo menos 3 caracteres.',
    1: value => emailRegex.test(value) || 'Email inválido.',
    2: value => value.length >= 11 || 'O número deve ter pelo menos 11 caracteres.',
    3: value => {
        if (value.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
        if (!/[A-Z]/.test(value)) return 'A senha deve ter pelo menos uma letra maiúscula.';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'A senha deve ter pelo menos um caractere especial.';
        return true;
    },
    4: (value, campos) => {
        if (value === '') return 'Campo Obrigatório';
        if (value !== campos[3].value) return 'As senhas não coincidem.';
        return true;
    }
};

function setError(index, message) {
    campos[index].style.border = '2px solid red';
    span[index].style.display = 'block';
    span[index].innerHTML = message;
}

function removeError(index) {
    campos[index].style.border = '2px solid green';
    span[index].style.display = 'none';
}

function validateField(index) {
    const field = campos[index];
    const validator = validators[index];
    const result = validator(field.value, campos);
    if (result !== true) {
        setError(index, result);
        return false;
    } else {
        removeError(index);
        return true;
    }
}

campos.forEach((campo, index) => {
    campo.addEventListener('input', () => validateField(index));
});

validarRegistro.addEventListener("click", validacaoFinal);

function validacaoFinal(event) {
    event.preventDefault(); // Impede o comportamento padrão do botão

    let formValido = true; // Variável para rastrear se o formulário é válido

    campos.forEach((campo, index) => {
        if (!validateField(index)) {
            formValido = false; // Define como falso se algum campo estiver inválido
        }
    });

    if (formValido) {
        // Se todos os campos estiverem válidos, você pode prosseguir com a ação desejada
        // Por exemplo, redirecionar para outro link ou enviar o formulário
        // window.location.href = "seu_link_aqui";
    }
}

//! trocar de tema

const obj = document.querySelectorAll(".obj");
const icon = document.getElementById("dark");
const temabtn = document.querySelector(".tema");

temabtn.addEventListener("click", respostaTema);

function respostaTema() {
  obj.forEach(element => {
    element.classList.toggle("dark");
  });
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
}


//! local storege

document.addEventListener("DOMContentLoaded", function() {
    const accessInput = document.getElementById('accessInput');
    const rememberCheckbox = document.getElementById('rememberCheckbox');

    // Verifica se já existe uma forma de acesso salva no localStorage
    const savedAccess = localStorage.getItem('accessInfo');

    if (savedAccess) {
        accessInput.value = savedAccess;
        rememberCheckbox.checked = true;
    }

    // Adiciona um evento de mudança ao checkbox
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('accessInfo', accessInput.value);
        } else {
            localStorage.removeItem('accessInfo');
        }
    });

    // Atualiza o localStorage toda vez que o usuário digita no input
    accessInput.addEventListener('input', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('accessInfo', this.value);
        }
    });
});