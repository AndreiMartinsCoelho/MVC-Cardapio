function loginUser(email, senha) {
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
  }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao fazer login");
      }
    }).then((responseData) => {
      if (responseData.auth) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        
        console.log("Token salvo com sucesso");
        console.log(responseData);
        window.location.href = "/ejs/home";
      } else {
        alert(responseData.message);
      }
    })
    .catch((error) => {
      alert(error.message);
  });
}

//Função para resetar a senha
function resetPassword(email,novaSenha, confirmSenha) {
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
  }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao resetar a senha");
      }
    }).then((responseData) => {
      console.log(responseData);
    }).catch((error) => {
      alert(error.message);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const resetForm = document.getElementById("reset-form");
  if (resetForm) {
    resetForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio tradicional do formulário

      const emailInput = document.querySelector(".inputEmail3[type='email']");
      console.log("Email Input:", emailInput);
      const senhaInput = document.querySelector(".inputPassword3[type='password']");
      console.log("Senha Input:", senhaInput);
      const comfirmSenhaInput = document.querySelector(".confirmSenhaInput[type='password']");
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

 //redirecionar para a home
 document.querySelector("#logarDireto").addEventListener("click", () => {
    const token = localStorage.getItem("token");

    // Verificar se o token é válido, se for válido, redirecionar para a home
    if (token == null&& token == undefined) {
      alert("Você não está logado");
      window.location.href = "/ejs/login";
    } else {
      console.log("Token válido");
      window.location.href = "/ejs/home";
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
