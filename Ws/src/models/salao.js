const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salao = new Schema({
    nome: {
        type: String,
        required: [true, 'O Nome é obrigatório']
    },
    foto: String,
    capa: String,
    email: {
        type: String,
        required: [true, 'O Email é obrigatório']
    },
    senha: {
        type: String,
        required: [true, 'A Senha é obrigatória']
    },
    telefone: String,
    endereco: {
        cidade: String,
        uf: String,
        cep: String,
        numero: String,
        pais: String
    },
    geo: {
        tipo: String,
        coordinates: [Number],
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
    recipientId:{
        type: String
    }
});

salao.index({ geo: '2dsphere' })

module.exports = mongoose.model('Salao', salao)