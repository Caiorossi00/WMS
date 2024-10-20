import React from "react";

function Historico({ historico }) {
  return (
    <div>
      <h2>Histórico de Alterações</h2>
      <ul>
        {historico.map((registro, index) => (
          <li key={index}>
            <strong>{registro.nomeProduto}</strong>: {registro.quantidadeAntiga}{" "}
            → {registro.novaQuantidade} em {registro.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historico;
