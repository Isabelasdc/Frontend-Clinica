import * as Yup from 'yup';

const ExamesValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(50, 'O máximo de caracteres é 50')
        .required('Campo Obrigatório'),
    descricao: Yup.string()
        .min(5, 'O mínimo de caracteres é 5')
        .max(200, 'O máximo de caracteres é 200')
        .required('Campo Obrigatório'),
    preco: Yup.number()
        .positive('O preço deve ser um número positivo')
        .required('Campo Obrigatório'), // Certifique-se de que o campo não está vazio
});

export default ExamesValidator;
