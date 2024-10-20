import React, { useState } from "react";
import { db } from "./firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import "./ProdutoCard.css";

function ProdutoCard({
  id,
  nomeProduto,
  quantidadeInicial,
  registrarHistorico,
  removerProduto,
  // Adicionar outros props se necessário
}) {
  const [quantidade, setQuantidade] = useState(quantidadeInicial);

  const atualizarQuantidadeNoFirestore = async (novaQuantidade) => {
    try {
      const produtoRef = doc(db, "produtos", id);
      console.log("Referência do produto:", produtoRef);

      await updateDoc(produtoRef, { quantidade: novaQuantidade });
      console.log("Quantidade atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a quantidade:", error);
      alert(
        "Ocorreu um erro ao atualizar a quantidade. Por favor, tente novamente."
      );
    }
  };

  const aumentarQuantidade = async () => {
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade);
    registrarHistorico(nomeProduto, quantidade, novaQuantidade);
    await atualizarQuantidadeNoFirestore(novaQuantidade);
  };

  const diminuirQuantidade = async () => {
    if (quantidade > 0) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      registrarHistorico(nomeProduto, quantidade, novaQuantidade);
      await atualizarQuantidadeNoFirestore(novaQuantidade);
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
