// modal
const modalElement = document.getElementById("register-modal");
const myModal = modalElement ? new bootstrap.Modal(modalElement) : null;

// criação da session e verificação de login automático
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// verifica se o login automático está ativo
checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const checkSession = document.getElementById('session-check').checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o usuário ou sua senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou sua senha.");
            return;
        }

        saveSession(email, checkSession);

        // se já logado, redirecionar para a home
        window.location.href = 'home.html';
    }
});


//CRIAÇÃO DE CONTA
document.getElementById("create-form").addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('password-create-input').value;

    if(email.length < 3) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 digitos.")
        return;
    }

    saveAccount({login: email, password: password, transactions: []});

    myModal.hide();

    alert("Conta criada com sucesso.");

});

// FUNÇÕES DIVERSAS DO SISTEMA

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    // redirecionar para home se já estiver logado
    if(logged) {
        saveSession(logged, session);
        window.location.href = 'home.html';
    }



}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}