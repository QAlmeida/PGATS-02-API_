// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
// Aplicação
const app = require('../../app');

//Mock
const transferService = require('../../service/transferService');

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



        it('Usando Mocks: Quando destinatario e remetente são inexistentes, recebo 400',async () => {
            // Mocar apenas  função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .send({ from: "alice", to: "bob", value: 1000 });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
            // expect(resposta.body).to.have.property('transfer');

            // Restaura a função original após o teste
            sinon.restore();
        })

         it('Usando Mocks: Quando informo valores válidos, recebo 201 CREATED',async () => {
            // Mocar apenas  função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.returns({ from: "alice", to: "bob", value: 1000, date: new Date().toISOString() });

            const resposta = await request(app)
                .post('/transfer')
                .send({ from: "alice", to: "bob", value: 1000 });
            expect(resposta.status).to.equal(201);
            // A API retorna um objeto com mensagem e o objeto transferido dentro de `transfer`
            expect(resposta.body).to.have.property('message', 'Transferência realizada');
            expect(resposta.body).to.have.property('transfer');
            expect(resposta.body.transfer).to.have.property('from', 'alice');
            expect(resposta.body.transfer).to.have.property('to', 'bob');
            expect(resposta.body.transfer).to.have.property('value', 1000);
            expect(resposta.body.transfer).to.have.property('date');

            // Restaura a função original após o teste
            sinon.restore();
        })
    }); 
    describe('GET /transfer', () => { 
    });
});  