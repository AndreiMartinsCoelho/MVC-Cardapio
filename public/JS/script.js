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
        const auten = responseData.auth;
        const MSG2 = document.getElementById("erroMENL");
        if(auten==false){
          MSG2.innerHTML="Erro ao fazer login. Verifique as credenciais fornecidas."
          setTimeout(()=>{
            MSG2.style.display="none";
          }, 2000)//2 segundos
        }else{
          localStorage.setItem("token", responseData.token);
          localStorage.setItem("user", JSON.stringify(responseData.user));
          MSG2.innerHTML="Login efetuado com sucesso e Token salvo com sucesso"
          setTimeout(()=>{
            window.location.href ="/ejs/home";
            MSG2.style.display="none";
          }, 1000)//1 segundos
        }
        console.log(responseData);
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
      const Sucesso = responseData.success;
      const MSG = document.getElementById("erroMEN");
      if(Sucesso==false){ 
        MSG.innerHTML="Não foi possível alterar a senha. Verifique as credenciais fornecidas."
        setTimeout(()=>{
          MSG.style.display="none";
        }, 2000)//2 segundos
      }else{
        MSG.innerHTML="Senha da conta alterada com sucesso"
        setTimeout(()=>{
          window.location.href = "/ejs/login";
          MSG.style.display="none";
        }, 3000)//3 segundos
      }
      console.log("Teste",responseData);
    }).catch((error) => {
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
    const MSGW = document.getElementById("MSGW");

    // Verificar se o token é válido, se for válido, redirecionar para a home
    if (token == null&& token == undefined) {
      MSGW.innerHTML="Você não está logado!!!"
        setTimeout(()=>{
          window.location.href = "/ejs/login";
          MSGW.style.display="none";
        }, 2000)//2 segundos
    } else {
      MSGW.innerHTML="Você está logado!!!"
      setTimeout(()=>{
        window.location.href = "/ejs/home";
        MSGW.style.display="none";
      }, 2000)//2 segundos
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
