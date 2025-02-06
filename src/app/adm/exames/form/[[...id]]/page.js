'use client'

import Pagina from "@/app/components/Pagina"
import ExameValidator from "@/validators/ExameValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdArrowBack } from "react-icons/md"
import { v4 } from 'uuid'

export default function ExamesForm({ params }) {
    const route = useRouter()
    const exames = JSON.parse(localStorage.getItem('exames')) || []
    const dados = exames.find(item => item.id === params.id)
    const exame = dados || { nome: '', descricao: '', preco: '', imagem: '' }

    function salvar(dados) {
        if (exame.id) {
            Object.assign(exame, dados)
        } else {
            dados.id = v4()
            exames.push(dados)
        }
        localStorage.setItem('exames', JSON.stringify(exames))
        return route.push('/adm/exames')
    }

    return (
        <Pagina titulo="Cadastrar/Editar Exame">
            <Formik
                initialValues={exame}
                validationSchema={ExameValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors
                }) => (
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome do Exame</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                                isInvalid={!!errors.nome}
                                placeholder="Digite o nome do exame"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nome}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descricao"
                                value={values.descricao}
                                onChange={handleChange}
                                isInvalid={!!errors.descricao}
                                placeholder="Descreva o exame"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.descricao}
                            </Form.Control.Feedback>
                        </Form.Group>

                      

                        <Form.Group className="mb-3" controlId="imagem">
                            <Form.Label>Imagem (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem"
                                value={values.imagem}
                                onChange={handleChange}
                                isInvalid={!!errors.imagem}
                                placeholder="Cole o link da imagem do exame"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.imagem}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/adm/exames" className="btn btn-danger ms-3">
                                <MdArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
