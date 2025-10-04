// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
// Aplicação
const app = require('../../app');

// Testes

describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando destinatario e remetente são inexistentes, recebo 400',async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({ from: "alice", to: "bob", value: 1000 });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
            // expect(resposta.body).to.have.property('transfer');
        })
    }); 
    describe('GET /transfer', () => { 
    });
});  