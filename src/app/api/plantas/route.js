import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

// GET: Busca todas as plantas no MongoDB
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("botanic_db");
    const plantas = await db.collection("plantas").find({}).toArray();
    
    // Convertemos o _id do MongoDB para uma string 'id' para facilitar o uso no React
    return Response.json(plantas.map(p => ({
      ...p,
      id: p._id.toString() 
    })));
  } catch (e) {
    return Response.json({ error: "Erro ao conectar ao banco" }, { status: 500 });
  }
}

// POST: Salva uma nova planta
export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("botanic_db");
    
    // Inserimos o objeto completo que veio do formulário
    const resultado = await db.collection("plantas").insertOne(body);
    
    return Response.json({ 
      ...body, 
      id: resultado.insertedId.toString() 
    }, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}

// DELETE: Remove uma planta baseada no ID (ObjectId)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return Response.json({ error: "ID não fornecido" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("botanic_db");

    // No MongoDB, precisamos envolver o ID com o comando new ObjectId()
    const resultado = await db.collection("plantas").deleteOne({ 
      _id: new ObjectId(id) 
    });

    if (resultado.deletedCount === 1) {
      return Response.json({ mensagem: "Removido com sucesso" });
    }
    
    return Response.json({ mensagem: "Planta não encontrada" }, { status: 404 });
  } catch (e) {
    return Response.json({ error: "Erro ao excluir" }, { status: 500 });
  }
}

// PUT: Atualiza uma planta existente
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const dadosNovos = await request.json();

    if (!id) return Response.json({ error: "ID não fornecido" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("botanic_db");

    // O comando $set do MongoDB atualiza apenas os campos enviados
    const resultado = await db.collection("plantas").updateOne(
      { _id: new ObjectId(id) },
      { $set: dadosNovos }
    );

    if (resultado.matchedCount === 1) {
      // Buscamos o objeto atualizado para devolver ao Front-end
      const plantaAtualizada = await db.collection("plantas").findOne({ _id: new ObjectId(id) });
      return Response.json({ ...plantaAtualizada, id: plantaAtualizada._id.toString() });
    }

    return Response.json({ mensagem: "Planta não encontrada" }, { status: 404 });
  } catch (e) {
    return Response.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}