import React, { useState } from "react";
import "./AddProdutoForm.css";

function AddProdutoForm({ adicionarProduto }) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (loading) return;

    setLoading(true);

    if (!nome) {
      setError("O nome do produto é obrigatório.");
      setLoading(false);
      return;
    }

    const quantidadeNumerica = parseInt(quantidade, 10);
    if (!quantidade || isNaN(quantidadeNumerica) || quantidadeNumerica < 0) {
      setError(
        "A quantidade deve ser um número válido e maior ou igual a zero."
      );
      setLoading(false);
      return;
    }

    try {
      await adicionarProduto(nome, quantidadeNumerica);
      setSuccess(true);
      setNome("");
      setQuantidade("");
      setError("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      setError("Erro ao adicionar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
          disabled={!nome || !quantidade || loading}
        >
          {loading ? "Adicionando..." : "Adicionar Produto"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default AddProdutoForm;
