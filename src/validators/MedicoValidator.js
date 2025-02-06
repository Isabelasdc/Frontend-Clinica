import * as Yup from 'yup';

const MedicosValidator = Yup.object().shape({
    nome: Yup.string()
        .required('O nome é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(50, 'O nome pode ter no máximo 50 caracteres'),
    especialidade: Yup.string()
        .required('A especialidade é obrigatória')
        .min(3, 'A especialidade deve ter pelo menos 3 caracteres')
        .max(50, 'A especialidade pode ter no máximo 50 caracteres'),
    telefone: Yup.string()
        .required('O telefone é obrigatório')
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O telefone deve estar no formato (99) 99999-9999'),
    crm: Yup.string()
        .required('O CRM é obrigatório')
        .matches(/^\d{6}\/CRM\/[A-Z]{2}$/, 'O CRM deve estar no formato 123456/CRM/XX'),
    email: Yup.string()
        .required('O email é obrigatório')
        .email('O email deve ser válido'),
});

export default MedicosValidator;
