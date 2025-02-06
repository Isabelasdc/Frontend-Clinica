import * as Yup from 'yup';

export const ConsultaValidator = Yup.object().shape({
  especialidade: Yup.string()
    .required('A especialidade é obrigatória'), // Campo obrigatório
  medico: Yup.string()
    .required('O médico é obrigatório'), // Campo obrigatório
  crm: Yup.string()
    .matches(/^CRM\/\d{2} \d{6}$/, 'CRM inválido. Formato esperado: CRM/99 999999') // Validando o formato do CRM
    .required('O CRM é obrigatório'), // Campo obrigatório
  data: Yup.string()
    .required('A data da consulta é obrigatória') // Campo obrigatório
    .matches(
      /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 
      'Data inválida. Formato esperado: DD/MM/AAAA'
    ), // Validando o formato da data
  horarios: Yup.array()
    .of(Yup.string().matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 'Horário inválido. Formato esperado: HH:MM'))
    .min(1, 'Pelo menos um horário é obrigatório') // Validando ao menos um horário
    .required('Os horários são obrigatórios'), // Campo obrigatório
  observacoes: Yup.string()
    .notRequired() // Observações não obrigatórias
    .max(500, 'A observação não pode ter mais de 500 caracteres') // Limitando o tamanho máximo da observação
});

export default ConsultaValidator;
