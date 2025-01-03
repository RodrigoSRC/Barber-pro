const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema({
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
        default: null
    },
    foto: String,
    // foto: {
    //     type: String,
    //     default: "https://www.svgrepo.com/show/105517/user-icon.svg"
    // },
    dataNascimento: {
        type: String, // yyyy-mm-dd
        required: true
    },
    sexo: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },

    contaBancaria: {
        titular: {
            type: String,
            required: true
        },
        cpfCnpj: {
            type: String,
            required: true
        },
        banco: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true,
            enum: ['conta_corrente', 'conta_poupanca','conta_corrente_conjunta','conta_poupanca_conjunta',]
        },
        agencia: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        dv: {
            type: String,
            required: true
        },
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
    recipientId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Colaborador', colaborador)