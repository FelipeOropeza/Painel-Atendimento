function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "time"
  ).textContent = `${horas}:${minutos}:${segundos}`;
}

async function atualizarTemperatura() {
  try {
    const temperatura = await fetchTemperatura();
    document.getElementById("temperature").textContent = temperatura + "°C";
  } catch (error) {
    console.error("Erro ao atualizar a temperatura:", error);
    document.getElementById("temperature").textContent = "--°C";
  }
}

async function fetchTemperatura() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const url = `/temperatura?lat=${lat}&lon=${lon}`;

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Erro na API");
          const data = await response.json();
          resolve(data.temperature.toFixed(1)); // Retorna a temperatura
        } catch (error) {
          reject(error);
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}

async function atualizarSenhas() {
  try {
    const response = await fetch("/obter-senhas");
    if (!response.ok) throw new Error("Erro ao buscar senhas");
    const dados = await response.json();

    const senhasGeradasContainer = document.getElementById("senhas-geradas");
    senhasGeradasContainer.innerHTML = "";
    if (dados.senhasGeradas && dados.senhasGeradas.length > 0) {
      dados.senhasGeradas.forEach((senha) => {
        const li = document.createElement("li");
        li.classList.add(
          "bg-blue-100",
          "text-blue-700",
          "p-4",
          "rounded-md",
          "shadow"
        );
        li.textContent = `Senha: ${senha.nmSenha}`;
        senhasGeradasContainer.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.classList.add("text-gray-500");
      li.textContent = "Nenhuma senha disponível.";
      senhasGeradasContainer.appendChild(li);
    }

    const ultimaSenhaContainer = document.getElementById("ultima-senha");
    if (dados.senhaAtual) {
      ultimaSenhaContainer.textContent = `Senha chamada: ${dados.senhaAtual.nmSenha} - Guichê: ${dados.senhaAtual.salaSenha}`;
      falarSenha();
    } else {
      ultimaSenhaContainer.textContent = "Nenhuma senha chamada ainda...";
    }

    const senhasChamadasContainer =
      document.getElementById("senhas-ja-chamadas");
    senhasChamadasContainer.innerHTML = "";
    if (dados.senhasConcluidas && dados.senhasConcluidas.length > 0) {
      dados.senhasConcluidas.forEach((senha) => {
        const li = document.createElement("li");
        li.classList.add(
          "bg-red-100",
          "text-red-700",
          "p-4",
          "rounded-md",
          "shadow"
        );
        li.textContent = `Senha: ${senha.nmSenha} - Guichê: ${senha.salaSenha}`;
        senhasChamadasContainer.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.classList.add("text-gray-500");
      li.textContent = "Nenhuma senha concluída.";
      senhasChamadasContainer.appendChild(li);
    }
  } catch (error) {
    console.error("Erro ao atualizar senhas:", error);
  }
}

function falarSenha() {
  const texto = document.getElementById("ultima-senha").textContent; // Pega o texto da senha atual
  const synth = window.speechSynthesis; // Instancia a síntese de fala
  const utterance = new SpeechSynthesisUtterance(texto); // Cria o objeto de fala com o texto
  synth.speak(utterance); // Fala o texto
}

atualizarSenhas();
setInterval(atualizarSenhas, 60000);

setInterval(atualizarRelogio, 1000);
atualizarTemperatura();
setInterval(atualizarTemperatura, 20000);
