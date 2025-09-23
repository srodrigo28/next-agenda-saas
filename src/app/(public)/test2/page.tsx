"use client"

import { useState } from "react";

interface TarefaProps {
  id: number;
  nome: string;
  time: string;
  data: string;
  status: boolean;
}

export default function Teste() {
  const [tarefas, setTarefas] = useState<TarefaProps[]>([]);
  const [nome, setNome] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const adicionarOuEditarTarefa = () => {
    if (!nome || !data) return;

    if (editandoId !== null) {
      // Editar tarefa existente
      const tarefasAtualizadas = tarefas.map((tarefa) =>
        tarefa.id === editandoId
          ? { ...tarefa, nome, time, data }
          : tarefa
      );
      setTarefas(tarefasAtualizadas);
      setEditandoId(null);
    } else {
      // Adicionar nova tarefa
      const novaTarefa: TarefaProps = {
        id: Date.now(),
        nome,
        time,
        data,
        status: false,
      };
      setTarefas([...tarefas, novaTarefa]);
    }

    setNome("");
    setTime("");
    setData("");
  };

  const excluirTarefa = (id: number) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const editarTarefa = (tarefa: TarefaProps) => {
    setNome(tarefa.nome);
    setTime(tarefa.time);
    setData(tarefa.data);
    setEditandoId(tarefa.id);
  };

  const alternarStatus = (id: number) => {
    const tarefasAtualizadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, status: !tarefa.status } : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };

  return (
    <div className="p-4 max-w-xl mx-auto flex flex-col gap-7 mt-3">
        <h1 className="font-bold mb-2 text-center text-5xl">Cadastre uma tarefa</h1>
      
      {/* Formulario */}
      <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          placeholder="Nome da tarefa"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={adicionarOuEditarTarefa}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {editandoId !== null ? "Salvar" : "Adicionar"}
        </button>
      </div>

      {/* Nossa Lista */}
      <h2 className="text-lg font-semibold mb-2">Listando tarefas</h2>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <p className={tarefa.status ? "line-through text-gray-500" : ""}>
                  <strong>{tarefa.nome} </strong> -
                  <strong>{tarefa.time}</strong> -
                  <strong>{tarefa.data}</strong>
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => alternarStatus(tarefa.id)}
                  className="text-green-600"
                >
                  {tarefa.status ? "Desfazer" : "Concluir"}
                </button>
                <button
                  onClick={() => editarTarefa(tarefa)}
                  className="text-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirTarefa(tarefa.id)}
                  className="text-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Contadores  */}
     <div className="flex gap-3 mt-3">
      <div className="flex-1 bg-green-300 justify-center items-center h-44 rounded-full flex flex-col-reverse">
        <p className="text-gray-700 font-semibold">Total de tarefas</p>
        <div className="text-5xl">
            {tarefas.length}
        </div>
      </div>

      <div className="flex-1 bg-blue-600 justify-center items-center h-44 rounded-full flex flex-col-reverse">
        <p className="text-white font-semibold">Total Concluídas</p>
        <div className="text-5xl">
          {tarefas.filter((t) => t.status).length}
        </div>
      </div>

      <div className="flex-1 bg-yellow-500 justify-center items-center h-44 rounded-full flex flex-col-reverse">
        <p className="text-gray-700 font-semibold">Total Pendentes</p>
        <div className="text-5xl">
          {tarefas.filter((t) => !t.status).length}
        </div>
      </div>
     </div>
    </div>
  );
}
