'use client'

import Pagina from "@/app/components/Pagina"
import LocaisValidator from "@/validators/LocaisValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdArrowBack } from "react-icons/md"
import { mask } from "remask"
import { v4 } from 'uuid'

export default function LocaisForm({ params }) {
    const route = useRouter()
    const locais = JSON.parse(localStorage.getItem('locais')) || []
    const dados = locais.find(item => item.id == params.id)
    const local = dados || { nome: '', endereco: '', telefone: '',cep: '' }

    function salvar(dados) {
        if (local.id) {
            Object.assign(local, dados)
        } else {
            dados.id = v4()
            locais.push(dados)
        }
        localStorage.setItem('locais', JSON.stringify(locais))
        return route.push('/adm/locais')
    }

    return (
        <Pagina titulo="Locais">
            <Formik
                initialValues={local}
                validationSchema={LocaisValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors
                }) => (
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

                        <Form.Group className="mb-3" controlId="endereco">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                name="endereco"
                                value={values.endereco}
                                onChange={handleChange}
                                isInvalid={errors.endereco}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.endereco}
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
                        <Form.Group className="mb-3" controlId="cep">
                            <Form.Label>Cep</Form.Label>
                            <Form.Control
                                type="text"
                                name="cep"
                                value={values.cep}
                                onChange={(value) => {
                                    setFieldValue('cep', mask(value.target.value, '99999-999'))
                                }}
                                isInvalid={errors.telefone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.telefone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/adm/locais" className="btn btn-danger ms-3">
                                <MdArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
