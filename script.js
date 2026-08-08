const botaoCompartilhar = document.querySelector("#botao-compartilhar");
const mensagem = document.querySelector("#mensagem");

document.querySelectorAll(".carrossel__faixa").forEach((faixa) => {
  const grupo = faixa.querySelector(".carrossel__grupo");

  if (!grupo) {
    return;
  }

  const copia = grupo.cloneNode(true);
  copia.setAttribute("aria-hidden", "true");
  faixa.append(copia);
});

botaoCompartilhar.addEventListener("click", async () => {
  const dados = {
    title: document.title,
    text: "Conheça a Mundo Mapê!",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(dados);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    mostrarMensagem("Link copiado!");
  } catch (erro) {
    if (erro.name !== "AbortError") {
      mostrarMensagem("Não foi possível compartilhar agora.");
    }
  }
});

function mostrarMensagem(texto) {
  mensagem.textContent = texto;

  window.setTimeout(() => {
    mensagem.textContent = "";
  }, 2500);
}
