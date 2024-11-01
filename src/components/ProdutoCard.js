import React, { useState, useEffect } from "react";
import "./ProdutoCard.css";

function ProdutoCard({
  nomeProduto,
  quantidadeInicial,
  registrarHistorico,
  removerProduto,
  id,
}) {
  const [quantidade, setQuantidade] = useState(() => {
    const quantidadeSalva = localStorage.getItem(`produto-${id}`);
    return quantidadeSalva ? JSON.parse(quantidadeSalva) : quantidadeInicial;
  });

  useEffect(() => {
    localStorage.setItem(`produto-${id}`, JSON.stringify(quantidade));
  }, [quantidade, id]);

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
      <button className="btn-remover" onClick={() => removerProduto(id)}>
        &times;
      </button>
      <h3>{nomeProduto}</h3>
      <div className="quantidade">{quantidade}</div>
      <div className="btn-div">
        <button
          className="btn-decremento"
          onClick={diminuirQuantidade}
          disabled={quantidade === 0}
        >
          -
        </button>
        <button className="btn-incremento" onClick={aumentarQuantidade}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProdutoCard;
