import Icon from '@mdi/react';
import { mdiReminder } from '@mdi/js';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  filterCliente,
  updateCliente,
  addCliente,
  resetCliente,
  allClientes,
  unlinkCliente,
} from '../../store/modules/cliente/actions';

import util from '../../services/util';

import {
  Drawer,
  Button,
  Notification,
  Message,
  Tag,
  Modal,
  // Icon
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import Table from '../../components/Table';

const Clientes = () => {
  const dispatch = useDispatch();
  const { cliente, clientes, form, components, behavior } = useSelector(
    (state) => state.cliente
  );

  const setCliente = (key, value) => {
    dispatch(
      updateCliente({
        cliente: { ...cliente, [key]: value },
      })
    );
  };

  const setComponents = (component, state) => {
    dispatch(
      updateCliente({
        components: { ...components, [component]: state },
      })
    );
  };

  const onRowClick = (cliente) => {
    dispatch(
      updateCliente({
        cliente,
        behavior: 'update',
      })
    );
    setComponents('drawer', true);
  };

  const save = () => {
    if (
      !util.allFields(cliente, [
        'email',
        'nome',
        'telefone',
        'dataNascimento',
        'sexo',
      ])
    ) {
      // DISPARAR O ALERTA
      Notification.error({
        placement: 'topStart',
        title: 'Calma lá!',
        description: 'Antes de prosseguir, preencha todos os campos!',
      });
      return false;
    }

    dispatch(addCliente());
  };

  const remove = () => {
    // PERFORM REMOVE
    dispatch(unlinkCliente());
  };

  useEffect(() => {
    dispatch(allClientes());
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        open={components.drawer}
        size="sm"
        onClose={() => setComponents('drawer', false)}
      >
        <Drawer.Body>
          <h3>{behavior === "create" ? "Cria novo" : "Atualizar"}</h3>
          <div className="row mt-3 col-12">
            {/* {behavior !== 'create' && (
              <div className="col-12 my-3">
                <Message
                  showIcon
                  type="info"
                  title="Peça ao cliente para baixar o app!"
                  description="Se você precisa editar alguma informação do cliente, peça para que ele baixa o aplicativo e faça as alterações."
                />
                <Button block color="primary" className="mt-1">
                  Baixar o Aplicativo
                </Button>
              </div>
            )} */}
            <div className="form-group col-12">
              <b className="">E-mail</b>
              <div className="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="E-mail do cliente"
                  disabled={behavior !== 'create'}
                  onChange={(e) => {
                    setCliente('email', e.target.value);
                  }}
                  value={cliente.email}
                />
                {behavior === 'create' && (
                  <div className="input-group-append">
                    <Button
                      appearance="primary"
                      loading={form.filtering}
                      disabled={form.filtering}
                      onClick={() => {
                        dispatch(
                          filterCliente({
                            filters: { email: cliente.email, status: 'A' },
                          })
                        );
                      }}
                    >
                      Pesquisar
                    </Button>
                  </div>
                )
                }
              </div>
            </div>

            <div className="form-group col-6">
              <b className="">Nome</b>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Cliente"
                disabled={form.disabled}
                value={cliente.nome}
                onChange={(e) => setCliente('nome', e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <b className="">Telefone / Whatsapp</b>
              <input
                type="text"
                className="form-control"
                placeholder="Telefone / Whatsapp do Cliente"
                disabled={form.disabled}
                value={cliente.telefone}
                onChange={(e) => setCliente('telefone', e.target.value)}
              />
            </div>

            <div className="form-group col-6">
              <b className="">Data de Nascimento</b>
              <input
                type="date"
                className="form-control"
                disabled={form.disabled}
                value={cliente.dataNascimento}
                onChange={(e) => setCliente('dataNascimento', e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <b>Sexo</b>
              <select
                disabled={form.disabled}
                className="form-control"
                value={cliente.sexo}
                onChange={(e) => setCliente('sexo', e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>

            <div className="form-group col-6">
              <b>Tipo de documento</b>
              <select
                disabled={form.disabled}
                className="form-control"
                value={cliente.documento.tipo}
                onChange={(e) =>
                  setCliente('documento', {
                    ...cliente.documento,
                    tipo: e.target.value,
                  })
                }
              >
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>
            </div>
            <div className="form-group col-6">
              <b className="">Número do documento</b>
              <input
                type="text"
                className="form-control"
                disabled={form.disabled}
                value={cliente.documento.numero}
                onChange={(e) =>
                  setCliente('documento', {
                    ...cliente.documento,
                    numero: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group col-3">
              <b className="">CEP</b>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o CEP"
                disabled={form.disabled}
                value={cliente.endereco.cep}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    cep: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-6">
              <b className="">Rua / Logradouro</b>
              <input
                type="text"
                className="form-control"
                placeholder="Rua / Logradouro"
                disabled={form.disabled}
                value={cliente.endereco.logradouro}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    logradouro: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3">
              <b className="">Número</b>
              <input
                type="text"
                className="form-control"
                placeholder="Número"
                disabled={form.disabled}
                value={cliente.endereco.numero}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    numero: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3">
              <b className="">UF</b>
              <input
                type="text"
                className="form-control"
                placeholder="UF"
                disabled={form.disabled}
                value={cliente.endereco.uf}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    uf: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-9">
              <b className="">Cidade</b>
              <input
                type="text"
                className="form-control"
                placeholder="Cidade"
                disabled={form.disabled}
                value={cliente.endereco.cidade}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    cidade: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <Button
            // disabled={ableToSave(cliente)}
            block
            className={'btn btn-lg mt-3'}
            color={behavior === 'create' ? 'green' : 'red'}
            
            size="lg"
            loading={form.saving}
            onClick={() => {
              if (behavior === 'create') {
                save();
              } else {
                setComponents('confirmDelete', true);
              }
            }}
          >
            {behavior === 'create' ? 'Salvar' : 'Remover'} cliente
          </Button>
        </Drawer.Body>
      </Drawer>

      <Modal
        open={components.confirmDelete}
        onClose={() => setComponents('confirmDelete', false)}
        size="xs"
      >
        <Modal.Body>
        <Icon path={mdiReminder} size={1} />
        {/* <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24,
            }}
          /> */}
          {'  '} Tem certeza que deseja excluir? Essa ação será irreversível!
        </Modal.Body>
        <Modal.Footer>
          <Button loading={form.saving} onClick={() => remove()} color="red">
            Sim, tenho certeza!
          </Button>
          <Button
            onClick={() => setComponents('confirmDelete', false)}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Clientes</h2>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(resetCliente());
                  dispatch(
                    updateCliente({
                      behavior: 'create',
                    })
                  );
                  setComponents('drawer', true);
                }}
              >
                {/* <span className="mdi mdi-plus">
                  </span>  */}
                  + Novo Cliente
              </button>
            </div>
          </div>
          <Table
            rows={clientes}
            loading={form.filtering}
            config={[
              {
                label: 'Nome',
                key: 'nome',
                sortable: true,
                fixed: true,
                width: 200,
              },
              {
                label: 'E-mail',
                key: 'email',
                sortable: true,
                width: 200,
              },
              {
                label: 'Telefone / Whatsapp',
                key: 'telefone',
                sortable: true,
                width: 200,
              },
              {
                label: 'Sexo',
                key: 'sexo',
                content: (sexo) => (
                  <Tag color={sexo === 'M' ? 'blue' : 'violet'}>
                    {sexo === 'M' ? 'Masculino' : 'Feminino'}
                  </Tag>
                ),
                sortable: true,
              },
              {
                label: 'Data de cadastro',
                key: 'dataCadastro',
                sortable: true,
                width: 200,
              },
            ]}
            actions={(cliente) => (
              <Button
                color="blue"
                size="xs"
                /*onClick={() => {
                  console.log(item);
                }}*/
              >
                Ver informações
              </Button>
            )}
            onRowClick={(cliente) => onRowClick(cliente)}
          />
        </div>
      </div>
    </div>
  );
};

export default Clientes;