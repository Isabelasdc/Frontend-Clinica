import * as Yup from 'yup';

const LocaisValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    endereco: Yup.string()
        .min(10, 'O mínimo de caracteres é 10')
        .max(100, 'O máximo de caracteres é 100')
        .required('Campo Obrigatório'),
    telefone: Yup.string()
        .min(14, 'Formato inválido')
        .max(15, 'Formato inválido')
        .required('Campo Obrigatório'),
    cep: Yup.string()
        .required('O CEP é obrigatório')
        
});

export default LocaisValidator;
