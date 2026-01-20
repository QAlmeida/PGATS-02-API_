const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

function transfer({ from, to, value }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário não encontrado');
  if (sender.saldo < value) throw new Error('Saldo insuficiente');
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só para favorecidos');
  }
  sender.saldo -= value;
  recipient.saldo += value;
  const transfer = { from, to, value, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

module.exports = {
  transfer
};
