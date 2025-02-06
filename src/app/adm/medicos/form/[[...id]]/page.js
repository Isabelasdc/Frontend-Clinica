'use client'

import Pagina from "@/app/components/Pagina"
import MedicoValidator from "@/validators/MedicoValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdArrowBack } from "react-icons/md"
import { mask } from "remask"
import { v4 } from 'uuid'

export default function MedicosForm({ params }) {
    const route = useRouter()
    const medicos = JSON.parse(localStorage.getItem('medicos')) || []
    const dados = medicos.find(item => item.id == params.id)
    const medico = dados || { nome: '', especialidade: '', telefone: '', crm: '', email: '' } // Adicionando o campo email

    function salvar(dados) {
        if (medico.id) {
            Object.assign(medico, dados)
        } else {
            dados.id = v4()
            medicos.push(dados)
        }
        localStorage.setItem('medicos', JSON.stringify(medicos))
        return route.push('/adm/medicos')
    }

    return (
        <Pagina titulo="Médicos">
            <Formik
                initialValues={medico}
                validationSchema={MedicoValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors
                }) => {
                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    isInvalid={errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nome}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="especialidade">
                                <Form.Label>Especialidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="especialidade"
                                    value={values.especialidade}
                                    onChange={handleChange}
                                    isInvalid={errors.especialidade}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.especialidade}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(value) => {
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'))
                                    }}
                                    isInvalid={errors.telefone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="crm">
                                <Form.Label>CRM</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="crm"
                                    value={values.crm}
                                    onChange={(value) => {
                                        setFieldValue('crm', mask(value.target.value, 'AA - 999999'))
                                    }}
                                    isInvalid={errors.crm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.crm}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/adm/medicos" className="btn btn-danger ms-3">
                                    <MdArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Pagina>
    )
}
