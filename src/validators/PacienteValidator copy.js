import * as Yup from 'yup';

const PacientesValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    documento: Yup.string()
        .length(11, 'O CPF deve ter 11 dígitos') // Exemplo para CPF
        .required('Campo Obrigatório'),
    telefone: Yup.string()
        .length(14, 'O telefone deve ter 14 caracteres') // Exemplo para (99) 99999-9999
        .required('Campo Obrigatório'),
    email: Yup.string()
        .email('Formato de e-mail inválido')
        .required('Campo Obrigatório'),
    dataNascimento: Yup.string()
        .required('Campo Obrigatório'),
});

export default PacientesValidator;
