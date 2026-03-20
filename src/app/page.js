'use client'; 
import { useEffect, useState, useCallback } from 'react';

export default function Home() {
  const [plantas, setPlantas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [nomeCientifico, setNomeCientifico] = useState('');

  // 1. Função para buscar os dados (GET) - Agora com tratamento de erro visível
  const buscarPlantas = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      // Tentamos buscar na rota absoluta para evitar problemas de IP
      const res = await fetch('/api/plantas', { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error(`Erro do Servidor: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setPlantas(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.error("Erro detalhado:", error);
      setErro("Falha ao conectar com a API. Verifique se a pasta api/plantas/route.js existe.");
    } finally {
      //Garantir que o "Carregando" saia da tela dando certo ou errado
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarPlantas();
  }, [buscarPlantas]);

  // 2. Função para enviar os dados (POST)
  const handleAddPlanta = async (e) => {
    e.preventDefault();
    setErro(null);

    const novaPlanta = { 
      nome, 
      nomeCientifico, 
      uso: "Geral", 
      clima: "Adaptável"
    };

    try {
      const res = await fetch('/api/plantas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaPlanta),
      });

      if (res.ok) {
        const plantaSalva = await res.json();
        setPlantas(prev => [...prev, plantaSalva]);
        setNome('');
        setNomeCientifico('');
      } else {
        setErro("Não foi possível salvar a planta.");
      }
    } catch (error) {
      setErro("Erro de rede ao tentar salvar.");
    }
  };

  // 3. Função para deletar uma planta
  const handleDeletarPlanta = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta planta?")) return;

    try {
      const res = await fetch(`/api/plantas?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Atualiza a tela filtrando a lista local
        setPlantas(plantas.filter(p => p.id !== id));
      } else {
        setErro("Não foi possível excluir a planta.");
      }
    } catch (error) {
      setErro("Erro de rede ao tentar excluir.");
    }
  };

  return (
    <main className="p-10 font-sans bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Botanic: Paisagismo
      </h1>

      {/* Alerta de Erro - Se algo falhar, aparecerá aqui em vez de ficar carregando */}
      {erro && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 shadow-sm">
          <p className="font-bold">Ops!</p>
          <p>{erro}</p>
          <button 
            onClick={buscarPlantas}
            className="mt-2 text-sm underline hover:text-red-900"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Formulário de Cadastro */}
      <form onSubmit={handleAddPlanta} className="mb-10 p-6 bg-white rounded-lg shadow-md max-w-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Novo Registro</h2>
        
        <label className="block text-sm font-medium text-gray-600 mb-1">Nome Comum</label>
        <input 
          type="text" 
          placeholder="Ex: Samambaia" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2.5 border rounded-lg mb-4 bg-white focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">Nome Científico</label>
        <input 
          type="text" 
          placeholder="Ex: Nephrolepis exaltata" 
          value={nomeCientifico}
          onChange={(e) => setNomeCientifico(e.target.value)}
          className="w-full p-2.5 border rounded-lg mb-6 bg-white focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        <button type="submit" className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-colors shadow-md">
          Salvar na Biblioteca
        </button>
      </form>

      {/* Listagem */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Sua Coleção</h2>
      
      {carregando ? (
        <div className="flex items-center gap-3 text-gray-500 italic">
          <span className="animate-spin text-2xl">⏳</span>
          <p>Sincronizando dados com o servidor...</p>
        </div>
      ) : plantas.length === 0 ? (
        <p className="text-gray-500 bg-white p-4 rounded border italic">A biblioteca está vazia no momento.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plantas.map(planta => (
            <div key={planta.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-green-900 mb-1">{planta.nome}</h3>
              <p className="text-sm italic text-gray-500 mb-3">{planta.nomeCientifico}</p>
              
              <div className="flex gap-2">
                <span className="bg-green-50 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded border border-green-100">
                  {planta.clima || "Adaptável"}
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] uppercase font-bold px-2 py-1 rounded border border-blue-100">
                  {planta.uso || "Geral"}
                </span>
              </div>

              <button 
                onClick={() => handleDeletarPlanta(planta.id)}
                className="mt-4 text-red-600 text-sm font-bold hover:underline"
              >
                Excluir Planta
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}