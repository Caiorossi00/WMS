import React, { useState } from "react";
import ProdutoList from "./components/ProdutoList";
import SearchBar from "./components/SearchBar";
import AddProdutoForm from "./components/AddProdutoForm";
import { registrarNoHistorico } from "./components/utils/historyUtils";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");

  const adicionarProduto = (nomeProduto, quantidadeInicial) => {
    const novoProduto = {
      id: Date.now(),
      nome: nomeProduto,
      quantidade: quantidadeInicial,
    };
    setProdutos([...produtos, novoProduto]);
  };

  const registrarHistorico = (
    nomeProduto,
    quantidadeAntiga,
    novaQuantidade
  ) => {
    const novoRegistro = registrarNoHistorico(
      nomeProduto,
      quantidadeAntiga,
      novaQuantidade
    );
    setHistorico([...historico, novoRegistro]);
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  const filtrarProdutos = () => {
    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );
  };

  return (
    <div className="app">
      <h1>Rota 2 - Gerenciamento de estoque</h1>
      <AddProdutoForm adicionarProduto={adicionarProduto} />
      <SearchBar onSearch={setTermoBusca} />
      <ProdutoList
        produtos={filtrarProdutos()}
        registrarHistorico={registrarHistorico}
        removerProduto={removerProduto}
      />
    </div>
  );
}

export default App;
