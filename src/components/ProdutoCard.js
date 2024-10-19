import React, { useState } from "react";

function ProdutoCard({
  nomeProduto,
  quantidadeInicial,
  registrarHistorico,
  removerProduto,
  id,
}) {
  const [quantidade, setQuantidade] = useState(quantidadeInicial);

  const aumentarQuantidade = () => {
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade);
    registrarHistorico(nomeProduto, quantidade, novaQuantidade);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      registrarHistorico(nomeProduto, quantidade, novaQuantidade);
    }
  };

  return (
    <div className="produto-card">
      <h3>{nomeProduto}</h3>
      <div className="quantidade">{quantidade}</div>
      <button
        onClick={diminuirQuantidade}
        disabled={quantidade === 0}
        style={{
          backgroundColor: quantidade === 0 ? "#ccc" : "#f44336",
          color: quantidade === 0 ? "#666" : "#fff",
        }}
      >
        -
      </button>
      <button onClick={aumentarQuantidade}>+</button>
      <button
        onClick={() => removerProduto(id)}
        style={{ backgroundColor: "#ff4d4d", color: "#fff" }}
      >
        Remover
      </button>
    </div>
  );
}

export default ProdutoCard;
