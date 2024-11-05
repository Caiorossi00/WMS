import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProdutoList from "./components/ProdutoList";
import SearchBar from "./components/SearchBar";
import AddProdutoForm from "./components/AddProdutoForm";
import { registrarNoHistorico } from "./components/utils/historyUtils";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import Historico from "./components/Historico";

function App() {
  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    return produtosSalvos ? JSON.parse(produtosSalvos) : [];
  });

  const [historico, setHistorico] = useState(() => {
    const historicoSalvo = localStorage.getItem("historico");
    return historicoSalvo ? JSON.parse(historicoSalvo) : [];
  });

  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [historico]);

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

  const removerRegistro = (id) => {
    const novoHistorico = historico.filter((registro) => registro.id !== id);
    setHistorico(novoHistorico);
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
    <Router>
      <div className="app">
        <Logo />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddProdutoForm adicionarProduto={adicionarProduto} />
                <SearchBar onSearch={setTermoBusca} />
                <ProdutoList
                  produtos={filtrarProdutos()}
                  registrarHistorico={registrarHistorico}
                  removerProduto={removerProduto}
                />
              </>
            }
          />
          <Route
            path="/historico"
            element={
              <Historico
                historico={historico}
                removerRegistro={removerRegistro}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
