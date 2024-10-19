import React, { useState } from "react";
import "./AddProdutoForm.css";

function AddProdutoForm({ adicionarProduto }) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!nome) {
      setError("O nome do produto é obrigatório.");
      return;
    }

    if (!quantidade || isNaN(quantidade) || parseInt(quantidade, 10) < 0) {
      setError(
        "A quantidade deve ser um número válido e maior ou igual a zero."
      );
      return;
    }

    adicionarProduto(nome, parseInt(quantidade, 10));
    setSuccess(true);
    setNome("");
    setQuantidade("");
  };

  return (
    <form className="add-produto-form" onSubmit={handleSubmit}>
      <div>
        <h1>Adicionar item</h1>
        <input
          className="form-input"
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Quantidade inicial"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button
          className="form-button"
          type="submit"
          disabled={!nome || !quantidade}
        >
          Adicionar Produto
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default AddProdutoForm;
