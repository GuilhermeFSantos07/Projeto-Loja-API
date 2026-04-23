import { describe, it, expect, beforeAll } from "vitest";
import request from 'supertest';
import app from "../server.js";

describe ('Teste de produtos (Rotas Protegidas', () => {
    let token = '';

    beforeAll(async () => {
        const respostaLogin = await request(app)
            .post('/api/auth/login')
            .send({
                username: "guilherme_dev",
                senha: "Scv22sdo"
            });
        token = respostaLogin.body.token;
    });

    it('Deve criar um produto com um token valido (Status 201)', async () => {
        const respostaProduto = await request(app)
            .post ('/api/produtos')
            .set('Authorization', `Bearer ${token}`)
            .send ({
                nome: "Teclado Mecânico de Teste",
                preco: 150.00,
                descricao: "Criado pelo Supertest de forma automatizada"
            });
        expect(respostaProduto.status).toBe(201);
        expect(respostaProduto.body.produto).toHaveProperty('_id');
    });

    it ('Deve bloquear a criação de produto SEM enviar o token (Erro 401)', async () => {
        const respostaErro = await request(app)
            .post ('/api/produtos')
            .send({
                nome: "Mouse Invasor",
                preco: 50.00,
                descricao: "Tentando criar sem ter feito login"
            });
        expect(respostaErro.status).toBe(401);
    });
});