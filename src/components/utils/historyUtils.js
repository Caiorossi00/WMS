export const registrarNoHistorico = (
  nomeProduto,
  quantidadeAntiga,
  novaQuantidade
) => {
  const dataAtual = new Date();
  return {
    nomeProduto,
    quantidadeAntiga,
    novaQuantidade,
    data: dataAtual.toLocaleString(),
  };
};
