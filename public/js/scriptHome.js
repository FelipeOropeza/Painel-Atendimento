// Função para carregar senhas
async function carregarSenhas() {
    try {
      const response = await fetch('/senhas-geradas');
      if (!response.ok) {
        throw new Error('Erro ao carregar as senhas.');
      }
  
      const senhasGeradas = await response.json();
      const listaSenhas = document.getElementById('lista-senhas');
      listaSenhas.innerHTML = '';
  
      if (senhasGeradas.length > 0) {
        senhasGeradas.forEach(senha => {
          const li = document.createElement('li');
          li.className =
            'bg-blue-100 p-2 rounded-md flex justify-between items-center';
  
          li.innerHTML = `
            <span>Senha: ${senha.nmSenha}</span>
            <span>Painel: ${senha.painel?.nmPainel || 'N/A'}</span>
            <form action="/vincular-senha" method="POST">
              <input type="hidden" name="id" value="${senha.idSenha}" />
              <button
                type="submit"
                class="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
              >
                Vincular
              </button>
            </form>
          `;
          listaSenhas.appendChild(li);
        });
      } else {
        listaSenhas.innerHTML = `<li class="text-gray-500">Nenhuma senha disponível.</li>`;
      }
    } catch (error) {
      console.error('Erro ao carregar as senhas:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', carregarSenhas);
  
  setInterval(carregarSenhas, 30000);
  