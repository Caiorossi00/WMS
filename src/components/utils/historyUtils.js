export const registrarNoHistorico = (
  nomeProduto,
  quantidadeAntiga,
  novaQuantidade
) => {
  const dataAtual = new Date();
  return {
    id: Date.now(),
    nomeProduto,
    quantidadeAntiga,
    novaQuantidade,
    data: dataAtual.toLocaleString(),
  };
};
