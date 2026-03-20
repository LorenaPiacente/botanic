/**
 * Script para popular o MongoDB Atlas com dados iniciais, pra quem quiser clonar o projeto ^^
 * Como rodar: 
 * 1. Execute: node seed.js
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Função corrigida para ler o .env.local respeitando múltiplos sinais de "=" na URL
function carregarEnv() {
  const envPath = path.resolve(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(linha => {
      // Procuramos apenas o primeiro "=" para separar a chave do valor
      const index = linha.indexOf('=');
      if (index !== -1) {
        const chave = linha.substring(0, index).trim();
        const valor = linha.substring(index + 1).trim();
        if (chave && valor) process.env[chave] = valor;
      }
    });
  }
}

carregarEnv();

const uri = process.env.MONGODB_URI;

const plantasIniciais = [
  {
    nome: "Capim-do-Texas",
    nomeCientifico: "Cenchrus setaceus",
    uso: "Bordadura / Ornamental",
    clima: "Sol Pleno"
  },
  {
    nome: "Xanadú",
    nomeCientifico: "Philodendron xanadu",
    uso: "Forração / Vasos",
    clima: "Meia Sombra"
  },
  {
    nome: "Moréia",
    nomeCientifico: "Dietes bicolor",
    uso: "Grupos / Bordadura",
    clima: "Sol Pleno"
  },
  {
    nome: "Costela-de-Adão",
    nomeCientifico: "Monstera deliciosa",
    uso: "Ornamental / Interiores",
    clima: "Meia Sombra"
  },
  {
    nome: "Guaimbé",
    nomeCientifico: "Philodendron bipinnatifidum",
    uso: "Destaque / Tropical",
    clima: "Sol Pleno / Meia Sombra"
  }
];

async function semear() {
  if (!uri) {
    console.error("❌ Erro: MONGODB_URI não encontrada no .env.local");
    return;
  }

  const client = new MongoClient(uri);

  try {
    console.log("🌱 Conectando ao MongoDB Atlas...");
    await client.connect();
    
    const db = client.db("botanic_db");
    const collection = db.collection("plantas");

    console.log("🧹 Limpando dados antigos (opcional)...");
    // Se quiser manter o que já tem, comente a linha abaixo:
    // await collection.deleteMany({}); 

    console.log(`🚀 Inserindo ${plantasIniciais.length} plantas...`);
    await collection.insertMany(plantasIniciais);

    console.log("✅ Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao semear banco:", error);
  } finally {
    await client.close();
  }
}

semear();