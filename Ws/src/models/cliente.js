const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: "https://www.svgrepo.com/show/105517/user-icon.svg"
    },
    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },
    sexo: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    dataNascimento: {
        type: String, // yyyy-mm-dd
        required: true
    },
    documento: {
        tipo: {
            type: String,
            enum: ['individual', 'corporation'],
            required: true
        },
        numero: {
            type: String,
            required: true
        }
    },
    endereco: {
        cidade: String,
        uf: String,
        cep: String,
        logradouro: String,
        numero: String,
        pais: String,
      },
    customerId: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Cliente', cliente)