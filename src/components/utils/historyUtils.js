import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
export const registrarNoHistorico = async (
  nomeProduto,
  quantidadeAntiga,
  novaQuantidade
) => {
  const dataAtual = new Date();
  const novoRegistro = {
    nomeProduto,
    quantidadeAntiga,
    novaQuantidade,
    data: dataAtual.toLocaleString(),
  };

  await addDoc(collection(db, "historico"), novoRegistro);
  return novoRegistro;
};
