// array onde vamos guardar todos os resultados consultados

const resultadosCEP = [];

async function buscarCEP(cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(url);
    const dados = await response.json();

    if (dados.erro) {
      console.log("CEP não encontrado.");
      return;
    }

    // guarda o resultado no array
    resultadosCEP.push(dados);

    console.log("Dados recebidos:", dados);
    console.log("Array atualizado:", resultadosCEP);

  } catch (erro) {
    console.log("Erro ao buscar CEP:", erro);
  }
}

// exemplo de uso
buscarCEP("01001000"); // Praça da Sé — SP