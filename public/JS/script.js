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
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao fazer login");
      }
    })
    .then((responseData) => {
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
