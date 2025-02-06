'use client'

import Pagina from "@/app/components/Pagina";
import PacientesValidator from "@/validators/PacienteValidator"; // Assumindo que criamos um validator específico para Pacientes
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from 'uuid';

export default function PacienteForm({ params }) {
    const route = useRouter();

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const dados = pacientes.find(item => item.id === params.id);
    const paciente = dados || { nome: '', cpf: '', email: '', telefone: '', nascimento: '' };

    function salvar(dados) {
        if (paciente.id) {
            Object.assign(paciente, dados);
        } else {
            dados.id = v4();
            pacientes.push(dados);
        }
        
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        return route.push('/pacientes');
    }

    return (
        <Pagina titulo="Cadastro de Pacientes">
            <Formik
                initialValues={paciente}
                validationSchema={PacientesValidator}
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
                                isInvalid={!!errors.nome}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nome}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                value={values.cpf}
                                onChange={(value) => {
                                    setFieldValue('cpf', mask(value.target.value, '999.999.999-99'))
                                }}
                                isInvalid={!!errors.cpf}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cpf}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
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
                                isInvalid={!!errors.telefone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.telefone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="nascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="text"
                                name="nascimento"
                                value={values.nascimento}
                                onChange={(value) => {
                                    setFieldValue('nascimento', mask(value.target.value, '99/99/9999'))
                                }}
                                isInvalid={!!errors.nascimento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nascimento}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/pacientes" className="btn btn-danger ms-3">
                                <MdArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
