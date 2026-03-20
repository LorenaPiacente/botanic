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
