const express = require ('express');
const mongoose = require('mongoose')

const router = express.Router();
const Colaborador = require('../models/colaborador');
const SalaoColaborador = require('../models/relationship/salaoColaborador');
const ColaboradorServico = require('../models/relationship/colaboradorServico');
const pagarme = require('../services/pagarme');

router.post('/', async (req, res) => {
    const db = mongoose.connection;
    const session = await db.startSession();
    session.startTransaction();
  
    try {
      const { colaborador, salaoId } = req.body;
      let newColaborador = null;
  
      const existentColaborador = await Colaborador.findOne({
        $or: [
          { email: colaborador.email },
          { telefone: colaborador.telefone }
        ],
      });
  
      if (!existentColaborador) {
        // CRIANDO A CONTA BANCÁRIA
        const { contaBancaria } = colaborador;

        const pagarmeBankAccount = await pagarme('/bank_accounts', {
          bank_code: contaBancaria.banco,
          document_number: contaBancaria.cpfCnpj,
          agencia: contaBancaria.agencia,
          conta: contaBancaria.numero,
          conta_dv: contaBancaria.dv,
          type: contaBancaria.tipo,
          legal_name: contaBancaria.titular,
        });
  
        if (pagarmeBankAccount.error) {
          throw pagarmeBankAccount;
        }

  
        // CRIANDO RECEBEDOR
        const pargarmeRecipient = await pagarme('/recipients', {
          bank_account_id: pagarmeBankAccount.data.id,
          transfer_interval: 'daily',
          transfer_enabled: true,
        });
  
        if (pagarmeBankAccount.error) {
          throw pargarmeReceiver;
        }
  
        newColaborador = await new Colaborador({
          ...colaborador,
          recipientId: pargarmeRecipient.data.id,
        }).save({ session });
      }
  
      const colaboradorId = existentColaborador
        ? existentColaborador._id
        : newColaborador._id;
  
      // RELAÇÃO COM O SALÃO
      const existentRelationship = await SalaoColaborador.findOne({
        salaoId,
        colaboradorId,
        status: {$ne: 'E'}
      });
  
      if (!existentRelationship) {
        await new SalaoColaborador({
          salaoId,
          colaboradorId,
          status: colaborador.vinculo,
        }).save({ session });
      }
  
      if (existentRelationship) {
        await SalaoColaborador.findOneAndUpdate(
          {
            salaoId,
            colaboradorId,
          },
          { status: colaborador.vinculo },
          { session }
        );
      }
  
      // RELAÇÃO COM OS SERVIÇOS / ESPECIALIDADES
      await ColaboradorServico.insertMany(
        colaborador.especialidades.map((servicoId) => ({
          servicoId,
          colaboradorId,
        }))
      );
  
      await session.commitTransaction();
      session.endSession();
  
      if (existentRelationship && existentColaborador) {
        res.json({ error: true, message: 'Colaborador já cadastrado!' });
      } else {
        res.json({ error: false });
      }
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      res.json({ error: true, message: err.message });
    }
  });
  

router.put('/:colaboradorId', async (req, res) => {
    try {
      const { vinculo, vinculoId, especialidades } = req.body;
      const { colaboradorId } = req.params;
  
      await Colaborador.findByIdAndUpdate(colaboradorId, req.body);
  
      // ATUALIZANDO VINCULO
      if (vinculo) {
        await SalaoColaborador.findByIdAndUpdate(vinculoId, { status: vinculo });
      }
  
      // ATUALIZANDO ESPECIALIDADES
      if (especialidades) {
        await ColaboradorServico.deleteMany({
          colaboradorId,
        });
  
        await ColaboradorServico.insertMany(
          especialidades.map((servicoId) => ({
            servicoId,
            colaboradorId,
          }))
        );
      }
  
      res.json({ error: false });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  
router.delete('/vinculo/:id', async (req, res) => {
    try {
      await SalaoColaborador.findByIdAndUpdate(req.params.id, { status: 'E' });
      res.json({ error: false });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });

router.post('/filter', async (req, res) => {
  try {
    const colaboradores = await Colaborador.find(req.body.filters)
    res.json({error: false, colaboradores})

  } catch (err) {
    res.json({error: true, message: err.message})
  }
});


router.get('/salao/:salaoId', async(req, res) => {
  try {

    const {salaoId} = req.params 
    let listaColaboradores = []

    const salaoColaboradores = await SalaoColaborador.find({
      salaoId,
      status:{ $ne: 'E'},
    }).populate({path: 'colaboradorId', select: '-senha -recipientId'}).select('colaboradorId dataCadastro status')

    for (let vinculo of salaoColaboradores) {
      const especialidades = await ColaboradorServico.find({
        colaboradorId: vinculo.colaboradorId._id
      })

      listaColaboradores.push({
        ...vinculo._doc,
        especialidades: especialidades.map((especialidade) => 
          especialidade.servicoId
        )
      });
    }

    res.json({error: false, colaboradores: listaColaboradores.map((vinculo) => ({
      ...vinculo.colaboradorId,
      vinculoId: vinculo._id,
      vinculo: vinculo.status,
      especialidades: vinculo.especialidades,
      dataCadastro: vinculo.dataCadastro
    }))
  })


  } catch (err) {
    res.json({error: true, messaged: err.message})
  }
})

module.exports = router