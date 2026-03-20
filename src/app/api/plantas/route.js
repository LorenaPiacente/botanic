import { bibliotecaPlantas } from "../data";

export async function GET() {
    return Response.json(bibliotecaPlantas);
}

export async function POST(request) {
    const novaPlanta = await request.json();
    novaPlanta.id = Date.now();
    bibliotecaPlantas.push(novaPlanta);

    return Response.json(novaPlanta, {status: 201});
}

// DELETE: Remove uma planta da lista baseada no ID enviado na URL
export async function DELETE(request) {
  // 1. Extrai o ID da URL (ex: /api/plantas?id=123)
  const { searchParams } = new URL(request.url);
  const idParaRemover = Number(searchParams.get('id'));

  // 2. Procura a posição da planta no array
  const index = bibliotecaPlantas.findIndex(p => p.id === idParaRemover);
  
  if (index !== -1) {
    // 3. Remove 1 item naquela posição específica
    bibliotecaPlantas.splice(index, 1);
    return Response.json({ mensagem: "Removido com sucesso" });
  }

  // 4. Se o ID não existir, avisa o Front-end
  return Response.json({ mensagem: "Planta não encontrada" }, { status: 404 });
}

// PUT: Atualiza uma planta existente
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const idParaEditar = Number(searchParams.get('id'));
  const dadosNovos = await request.json();

  const index = bibliotecaPlantas.findIndex(p => p.id === idParaEditar);
  
  if (index !== -1) {
    // Mesclamos os dados antigos com os novos, mantendo o ID original
    bibliotecaPlantas[index] = { ...bibliotecaPlantas[index], ...dadosNovos };
    return Response.json(bibliotecaPlantas[index]);
  }

  return Response.json({ mensagem: "Planta não encontrada" }, { status: 404 });
}