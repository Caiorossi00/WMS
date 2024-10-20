import React, { useState, useEffect } from "react";
import { db } from "./firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";

function Historico() {
  const [historico, setHistorico] = useState([]);

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

  return (
    <div>
      <h2>Histórico de Alterações</h2>
      {historico.length === 0 ? (
        <p>Não há registros de alterações.</p>
      ) : (
        <ul>
          {historico.map((registro, index) => (
            <li key={index}>
              <strong>{registro.nomeProduto}</strong>:{" "}
              {registro.quantidadeAntiga} → {registro.novaQuantidade} em{" "}
              {registro.data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Historico;
