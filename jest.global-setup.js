// Fuso horário fixo para os testes de data darem o mesmo resultado em qualquer computador.
module.exports = async () => {
  process.env.TZ = 'America/Sao_Paulo';
};
