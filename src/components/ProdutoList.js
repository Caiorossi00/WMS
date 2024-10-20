import React from "react";
import { ref, update } from "firebase/database";
import { db } from "./firebase/firebaseConfig";

function ProdutoList({ produtos, removerProduto, registrarHistorico }) {
  const aumentarQuantidade = async (produto) => {
    const quantidadeAntiga = produto.quantidade;
    const novaQuantidade = quantidadeAntiga + 1;

    const produtoRef = ref(db, `produtos/${produto.id}`);
    await update(produtoRef, { quantidade: novaQuantidade });

    registrarHistorico(produto.nome, quantidadeAntiga, novaQuantidade);
  };

  const diminuirQuantidade = async (produto) => {
    const quantidadeAntiga = produto.quantidade;
    const novaQuantidade = quantidadeAntiga > 0 ? quantidadeAntiga - 1 : 0;

    const produtoRef = ref(db, `produtos/${produto.id}`);
    await update(produtoRef, { quantidade: novaQuantidade });

    registrarHistorico(produto.nome, quantidadeAntiga, novaQuantidade);
  };

  return (
    <div>
      {produtos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>Quantidade: {produto.quantidade}</p>
          <button onClick={() => aumentarQuantidade(produto)}>+</button>
          <button onClick={() => diminuirQuantidade(produto)}>-</button>
          <button onClick={() => removerProduto(produto.id)}>Remover</button>
        </div>
      ))}
    </div>
  );
}

export default ProdutoList;
