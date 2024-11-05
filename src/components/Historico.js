import React from "react";
import "./Historico.css";

function Historico({ historico, removerRegistro }) {
  return (
    <div className="historico-container">
      <h2 className="historico-title">Histórico de Alterações</h2>
      <ul className="historico-list">
        {[...historico].reverse().map((registro) => (
          <li key={registro.id} className="historico-item">
            <div className="historico-info">
              <strong>{registro.nomeProduto}</strong>
              <span>
                {registro.quantidadeAntiga} → {registro.novaQuantidade}
              </span>
              <span className="historico-date">em {registro.data}</span>
            </div>
            <button
              className="historico-btn"
              onClick={() => removerRegistro(registro.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historico;
