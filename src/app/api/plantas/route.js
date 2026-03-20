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