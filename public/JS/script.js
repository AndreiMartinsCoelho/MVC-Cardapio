function loginUser(email, senha) {
    const requestData = {
        email: email,
        senha: senha
    };

    fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao fazer login");
        }
    })
    .then(responseData => {
        if (responseData.auth) {
            console.log(responseData);
        } else {
            alert(responseData.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio tradicional do formulário

            const emailInput = document.querySelector("#email input[type='email']");
            const senhaInput = document.querySelector("#senha input[type='password']");

            const email = emailInput.value;
            const senha = senhaInput.value;

            console.log("Email:", email);
            console.log("Senha:", senha);

            loginUser(email, senha);
        });
    }
});

//Função para olhar a senha
const verSenha = document.querySelector("#verSenha");
const senha = document.querySelector("#senha input[type='password']");
verSenha.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
});
