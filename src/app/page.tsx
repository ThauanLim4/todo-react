"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import Image from "next/image";
import noTasks from "@/../public/noTask.svg";

const Home = () => {
  type Tipos = {
    nomeDaTarefa: string;
    completa: boolean;
  }

  const listaStorage = localStorage.getItem('Lista');

  const [lista, setLista] = useState<Tipos[]>(listaStorage ? JSON.parse(listaStorage) as Tipos[] : []);
  const [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    localStorage.setItem('Lista', JSON.stringify(lista))
  }, [lista])

  function adicionarItem(formulario: React.FormEvent<HTMLFormElement>) {
    formulario.preventDefault();

    if (!novoItem) {
      return;
    }

    const tarefaItem = {
      nomeDaTarefa: novoItem,
      completa: false
    }
    setLista([...lista, tarefaItem]);
    setNovoItem("");
    document.getElementById("addTask")?.focus();
  }

  function marcarConcluida(index: number){
    const listaConc = [...lista];
    listaConc[index].completa = !listaConc[index].completa;
    setLista(listaConc);
  }

  function excluirTarefa(index: number){
    const removerItem = [...lista];
    removerItem.splice(index, 1);
    setLista(removerItem);

  }

  function marcarTodasComoConcluida(){
    if(lista.length >= 1){
      const listaConc = [...lista]
      console.log(listaConc)
      listaConc.map((it) => it.completa = true);
      setLista(listaConc);
    }
  }

  function deletarTudo(){
    if(lista.length >= 1){
      setLista([]);
    }
  }

  return (
    <div className="p-5 w-full flex flex-col gap-10 max-w-screen-md mx-auto">
      <section className="flex items-center flex-col gap-10 mb-10">
        <h1 className="text-3xl font-bold">Lista de Tarefas</h1>
        <form className="flex h-14 w-11/12 items-center shadow01" onSubmit={adicionarItem}>
          <input type="text"
            id="addTask"
            className="outline-none h-full p-5 w-11/12 text-purple01"
            placeholder="adicionar tarefa"
            value={novoItem}
            onChange={e => setNovoItem(e.target.value)} />
          <button type="submit" className="mx-auto flex items-center justify-center bg-purple01 w-1/12 h-full">
            <FaCheck className="hover:text-green-600/85 text-xl" />
          </button>
        </form>
      </section>

      <span className="border border-gray-400/75"></span>

      <section className="my-5">
        <h2 className="text-2xl font-bold text-center m-5">Suas Tarefas</h2>
        <div className="flex flex-col gap-10">

         {lista.length >= 1 ? lista.map((item, index) => {
            return (
              <div className={`w-full flex shadow01 items-center ${item.completa ? "text-purple01 bg-green-600/85 line-through" : "bg-purple01 "}`} key={index}>
                <span className="max-sm:w-10/12 w-11/12 bg-white text-purple01 border-r-2 p-3 hover:bg-white/90"
                onClick={() => marcarConcluida(index)}
                >{item.nomeDaTarefa}</span>
                <button onClick={() => excluirTarefa(index)} className="text-white mx-auto hover:text-red-500 w-fit h-fit">
                  <FaTrash className="mx-auto" />
                </button>
              </div>
            )
          }) : <Image className="mx-auto" width={500} src={noTasks} alt="imagem ilustrativa de uma pessoa cumprindo tarefas" />}

        </div>
      </section>

      <section className="my-5">

        {lista.length >= 1 ? 
        <div className="flex justify-center gap-10 max-sm:flex-col max-sm:items-center">
          <button className="border border-green-600/85 h-10 w-44 hover:bg-green-600/85"
          onClick={marcarTodasComoConcluida}>Marcar concluídas</button>
          <span className="border border-gray-400/75 max-sm:hidden"></span>
          <button className="border border-red-500 h-10 w-44 hover:bg-red-500"
          onClick={deletarTudo}>Limpar tudo</button>
        </div>
        : ""}
      </section>

    </div>
  )
}

export default Home;