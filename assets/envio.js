
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // impede o redirecionamento padrão
  const form = e.target;
  const status = document.getElementById("formStatus");

  try {
    await fetch("https://formsubmit.co/herocleanservicos@gmail.com", {
      method: "POST",
      body: new FormData(form),
    });

    // Mostra mensagem de sucesso
    status.style.display = "block";
    status.style.color = "green";
    status.textContent = "✅ Mensagem enviada com sucesso!";

    // Limpa o formulário
    form.reset();

    // Esconde mensagem depois de 5 segundos (opcional)
    setTimeout(() => { status.style.display = "none"; }, 5000);

  } catch (error) {
    status.style.display = "block";
    status.style.color = "red";
    status.textContent = "❌ Erro ao enviar. Tente novamente.";
  }
});
