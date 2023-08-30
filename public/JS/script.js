function loginUser(email, senha) {
  //Função para fazer o login
  const requestData = {
    email: email,
    senha: senha,
  };

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao fazer login");
      }
    })
    .then((responseData) => {
      const auten = responseData.auth;
      const MSG2 = document.getElementById("erroMENL");
      if (auten == false) {
        MSG2.innerHTML =
          "Erro ao fazer login. Verifique as credenciais fornecidas.";
        setTimeout(() => {
          MSG2.style.display = "none";
          MSG2.style.display = "flex";
        }, 2000); //2 segundos
      } else {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        MSG2.innerHTML = "Login efetuado com sucesso e Token salvo com sucesso";
        setTimeout(() => {
          window.location.href = "/ejs/home";
          MSG2.style.display = "none";
          MSG2.style.display = "flex";
        }, 1000); //1 segundos
      }
      console.log(responseData);
    })
    .catch((error) => {
      alert(error.message);
    });
}

//Função para resetar a senha
function resetPassword(email, novaSenha, confirmSenha) {
  const requestData = {
    email: email,
    novaSenha: novaSenha,
    confirmSenha: confirmSenha,
  };

  fetch("http://localhost:3000/reset", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao resetar a senha");
      }
    })
    .then((responseData) => {
      const Sucesso = responseData.success;
      const MSG = document.getElementById("erroMEN");
      if (Sucesso == false) {
        MSG.innerHTML =
          "Não foi possível alterar a senha. Verifique as credenciais fornecidas.";
        setTimeout(() => {
          MSG.style.display = "none";
          MSG.style.display = "flex";
        }, 2000); //2 segundos
      } else {
        MSG.innerHTML = "Senha da conta alterada com sucesso";
        setTimeout(() => {
          window.location.href = "/ejs/login";
          MSG.style.display = "none";
          MSG.style.display = "flex";
        }, 3000); //3 segundos
      }
      console.log("Teste", responseData);
    })
    .catch((error) => {
      alert(error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const resetForm = document.getElementById("reset-form");
  if (resetForm) {
    resetForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio tradicional do formulário

      const emailInput = document.querySelector(".inputEmail3[type='email']");
      console.log("Email Input:", emailInput);
      const senhaInput = document.querySelector(
        ".inputPassword3[type='password']"
      );
      console.log("Senha Input:", senhaInput);
      const comfirmSenhaInput = document.querySelector(
        ".confirmSenhaInput[type='password']"
      );
      console.log("Confirmação de Senha Input:", comfirmSenhaInput);

      const email = emailInput.value;
      const novaSenha = senhaInput.value;
      const comfirmSenha = comfirmSenhaInput.value;

      console.log("Email:", email);
      console.log("Nova Senha:", novaSenha);
      console.log("Confirmação de Senha:", comfirmSenha);

      resetPassword(email, novaSenha, comfirmSenha);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio tradicional do formulário
      const emailInput = document.querySelector("#email input[type='email']");
      const senhaInput = document.querySelector(
        "#senha input[type='password']"
      );

      const email = emailInput.value;
      const senha = senhaInput.value;

      console.log("Email:", email);
      console.log("Senha:", senha);

      loginUser(email, senha);
    });
  }
});

//redirecionar para a Welcome
const logar = document.querySelector("#fechaJS");
logar.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "/ejs/welcome";
  }, 2000); //2 segundos
});

//redirecionar para a home
const logarDireto = document.querySelector("#logarDireto");
lo.addEventListener("click", () => {
  const token = localStorage.getItem("token");
  const MSGW = document.getElementById("MSGW");

  // Verificar se o token é válido, se for válido, redirecionar para a home
  if (token == null && token == undefined) {
    MSGW.innerHTML = "Você não está logado!!!";
    setTimeout(() => {
      window.location.href = "/ejs/login";
      MSGW.style.display = "none";
      MSGW.style.display = "flex";
    }, 2000); //2 segundos
  } else {
    MSGW.innerHTML = "Você está logado!!!";
    setTimeout(() => {
      window.location.href = "/ejs/home";
      MSGW.style.display = "none";
      MSGW.style.display = "flex";
    }, 2000); //2 segundos
    console.log("Token válido");
  }
});

const verSenha = document.querySelector("#verSenha");
const senhaInput = document.querySelector("#senha input[type='password']");

verSenha.addEventListener("click", function () {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
  } else {
    senhaInput.type = "password";
  }
});

//Função para deslogar
function logoutUser() {
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/ejs/login";
  }, 2000);
}

//Botão para deslogar
const deslogar = document.querySelector("#btn-deslogar");
deslogar.addEventListener("click", () => {
  const MSGN = document.getElementById("MSGN");
  MSGN.innerHTML = "Você será deslogado......";
  setTimeout(() => {
    MSGN.style.display = "none";
    MSGN.innerHTML.display = "flex";
  }, 2000); //2 segundos
  logoutUser();
});

// function getNomeUser() {
//   const user = localStorage.getItem("user");
//   const userObj = JSON.parse(user);
//   const userName = document.querySelector("#userName");
//   userName.innerHTML = "Nome: " + userObj.nome;
// }