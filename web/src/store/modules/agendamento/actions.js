import types from './types.js';

export function filterAgendamentos(range) {
  return { type: types.FILTER_AGENDAMENTOS, range };
}

export function updateAgendamento(payload) {
  return { type: types.UPDATE_AGENDAMENTO, payload };
}