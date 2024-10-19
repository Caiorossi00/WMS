import React from "react";
import ProdutoCard from "./ProdutoCard";
import "./ProdutoList.css";

function ProdutoList({ produtos, registrarHistorico, removerProduto }) {
  return (
    <div className="produto-list">
      {produtos.map((produto) => (
        <ProdutoCard
          key={produto.id}
          id={produto.id}
          nomeProduto={produto.nome}
          quantidadeInicial={produto.quantidade}
          registrarHistorico={registrarHistorico}
          removerProduto={removerProduto}
        />
      ))}
    </div>
  );
}

export default ProdutoList;
