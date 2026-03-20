'use client'; 
import { useEffect, useState, useCallback } from 'react';

export default function Home() {
  const [plantas, setPlantas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [nomeCientifico, setNomeCientifico] = useState('');
  const [uso, setUso] = useState('');
  const [clima, setClima] = useState('');

  // Estado para saber se estamos editando (guarda o ID da planta) ou criando (null)
  const [editandoId, setEditandoId] = useState(null);

  // 1. Função para buscar os dados (GET)
  const buscarPlantas = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const res = await fetch('/api/plantas', { cache: 'no-store' });
      
      if (!res.ok) throw new Error(`Erro: ${res.status}`);

      const data = await res.json();
      setPlantas(Array.isArray(data) ? data : []);
      
    } catch (error) {
      setErro("Falha ao conectar com a API.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarPlantas();
  }, [buscarPlantas]);

  // 2. Função unificada para Salvar (Criação ou Edição)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    const dadosPlanta = { 
      nome, 
      nomeCientifico, 
      uso, 
      clima };

    try {
      // Se tivermos um editandoId, o método é PUT e a URL leva o ID
      const metodo = editandoId ? 'PUT' : 'POST';
      const url = editandoId ? `/api/plantas?id=${editandoId}` : '/api/plantas';

      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPlanta),
      });

      if (res.ok) {
        const plantaResultado = await res.json();
        
        if (editandoId) {
          // Se estava editando, substitui o item antigo pelo novo na lista
          setPlantas(plantas.map(p => p.id === editandoId ? plantaResultado : p));
        } else {
          // Se era novo, adiciona ao final da lista
          setPlantas(prev => [...prev, plantaResultado]);
        }

        // Limpa tudo após o sucesso
        setNome('');
        setNomeCientifico('');
        setUso('');
        setClima('');
        setEditandoId(null);
      } else {
        setErro("Não foi possível processar a requisição.");
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
        setPlantas(plantas.filter(p => p.id !== id));
      } else {
        setErro("Não foi possível excluir a planta.");
      }
    } catch (error) {
      setErro("Erro de rede ao tentar excluir.");
    }
  };

  // 4. Função que prepara o formulário para edição
  const prepararEdicao = (planta) => {
    setEditandoId(planta.id); // Define qual ID estamos editando
    setNome(planta.nome);      // Preenche o input Nome
    setNomeCientifico(planta.nomeCientifico); // Preenche o Nome Científico
    setUso(planta.uso || ''); // Carrega o uso original
    setClima(planta.clima || ''); // Carrega o clima original
    window.scrollTo(0, 0);    // Sobe a página para o usuário ver o formulário preenchido
  };

  // Função extra para cancelar a edição caso o usuário desista
  const cancelarEdicao = () => {
    setEditandoId(null);
    setNome('');
    setNomeCientifico('');
  };

  return (
    <main className="p-10 font-sans bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Botanic: Paisagismo</h1>

      {erro && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 shadow-sm">
          <p>{erro} <button onClick={buscarPlantas} className="underline">Tentar novamente</button></p>
        </div>
      )}

      {/* Formulário: agora o onSubmit chama a função unificada handleSubmit */}
      <form onSubmit={handleSubmit} className="mb-10 p-6 bg-white rounded-lg shadow-md max-w-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          {editandoId ? "Editar Planta" : "Novo Registro"}
        </h2>
        
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

        <label className="block text-sm font-medium text-gray-600 mb-1">Uso / Categoria</label>
          <input 
            type="text" 
            placeholder="Ex: Ornamental, Bordadura..." 
            value={uso}
            onChange={(e) => setUso(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <label className="block text-sm font-medium text-gray-600 mb-1">Clima Ideal</label>
          <input 
            type="text" 
            placeholder="Ex: Sol Pleno, Meia Sombra..." 
            value={clima}
            onChange={(e) => setClima(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-colors shadow-md">
            {editandoId ? "Atualizar Dados" : "Salvar na Biblioteca"}
          </button>
          
          {/* Botão de Cancelar só aparece se estiver editando */}
          {editandoId && (
            <button 
              type="button" 
              onClick={cancelarEdicao}
              className="bg-gray-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Sua Coleção</h2>
      
      {carregando ? (
        <p className="italic text-gray-500">Buscando dados...</p>
      ) : plantas.length === 0 ? (
        <p className="text-gray-500 italic">A biblioteca está vazia.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plantas.map(planta => (
            <div key={planta.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-green-900 mb-1">{planta.nome}</h3>
              <p className="text-sm italic text-gray-500 mb-3">{planta.nomeCientifico}</p>
              
              <div className="flex gap-2">
                <span className="bg-green-50 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                  {planta.clima || "Adaptável"}
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                  {planta.uso || "Geral"}
                </span>
              </div>

              <div className="mt-4 flex gap-4">
                {/* Botão para iniciar a edição */}
                <button 
                  onClick={() => prepararEdicao(planta)}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  Editar
                </button>

                {/* Botão para deletar */}
                <button 
                  onClick={() => handleDeletarPlanta(planta.id)}
                  className="text-red-600 text-sm font-bold hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}