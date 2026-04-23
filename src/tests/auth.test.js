import { describe, it, expect } from "vitest";
import request from 'supertest';
import app from "../server.js";

describe ('Testes de autenticação (Auth)', () => {
    it ('Deve bloquear o login com credenciais incorretas (Erro 400)', async () => {
        const resposta = await request(app)
            .post('/api/auth/login')
            .send ({
                username: "usuario_que_nao_existe",
                senha: "senha_falsa_123"
            });

            expect(resposta.status).toBe(400);
            expect(resposta.body.message).toBe("Usuário não encontrado");
    });
});