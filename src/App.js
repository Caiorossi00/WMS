import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProdutoList from "./components/ProdutoList";
import SearchBar from "./components/SearchBar";
import AddProdutoForm from "./components/AddProdutoForm";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import Historico from "./components/Historico";
import { db } from "./components/firebase/firebaseConfig";
import { ref, onValue, push, remove, update } from "firebase/database";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const produtosRef = ref(db, "produtos");
    onValue(produtosRef, (snapshot) => {
      const data = snapshot.val();
      const produtosList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setProdutos(produtosList);
    });
  }, []);

  useEffect(() => {
    const historicoRef = ref(db, "historico");
    onValue(historicoRef, (snapshot) => {
      const data = snapshot.val();
      const historicoArray = data
        ? Object.values(data).map((registro) => ({
            nomeProduto: registro.nomeProduto,
            quantidadeAntiga: registro.quantidadeAntiga,
            novaQuantidade: registro.novaQuantidade,
            data: registro.data,
          }))
        : [];
      setHistorico(historicoArray);
    });
  }, []);

  const registrarHistorico = async (
    nomeProduto,
    quantidadeAntiga,
    novaQuantidade
  ) => {
    const novoRegistro = {
      nomeProduto,
      quantidadeAntiga,
      novaQuantidade,
      data: new Date().toLocaleString(),
    };

    const historicoRef = ref(db, "historico");
    const novoRegistroRef = push(historicoRef);
    await update(novoRegistroRef, novoRegistro);
  };

  const adicionarProduto = async (nomeProduto, quantidadeInicial) => {
    const novoProduto = {
      nome: nomeProduto,
      quantidade: quantidadeInicial,
    };

    const produtosRef = ref(db, "produtos");
    const novoProdutoRef = push(produtosRef);
    await update(novoProdutoRef, novoProduto);
  };

  const removerProduto = async (id) => {
    const produtoRef = ref(db, `produtos/${id}`);
    const produto = produtos.find((p) => p.id === id);

    if (produto) {
      const quantidadeAntiga = produto.quantidade;
      await remove(produtoRef);
      registrarHistorico(produto.nome, quantidadeAntiga, 0);
    }
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
                  removerProduto={removerProduto}
                  registrarHistorico={registrarHistorico}
                />
              </>
            }
          />
          <Route
            path="/historico"
            element={<Historico historico={historico} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
