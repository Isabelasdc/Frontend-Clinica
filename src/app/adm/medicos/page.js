'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Button, Card, Col, Row } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function Medicos() {
    const [medicos, setMedicos] = useState([])

    useEffect(() => {
        setMedicos(JSON.parse(localStorage.getItem('medicos')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = medicos.filter(item => item.id !== id)
            localStorage.setItem('medicos', JSON.stringify(dados))
            setMedicos(dados)
        }
    }

    return (
        <Pagina titulo="Médicos">
            <Link href="/adm/medicos/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>
            <Row xs={1} md={2} lg={3} className="g-4">
                {medicos.map((item) => (
                    <Col key={item.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.nome}</Card.Title>
                                <Card.Text>
                                    <strong>Especialidade:</strong> {item.especialidade}<br />
                                    <strong>Telefone:</strong> {item.telefone}<br />
                                    <strong>CRM:</strong> {item.crm}<br />
                                    <strong>Email:</strong> {item.email}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link href={`/adm/medicos/form/${item.id}`} className="btn btn-warning">
                                        <FaRegEdit /> Editar
                                    </Link>
                                    <Button variant="danger" onClick={() => excluir(item.id)}>
                                        <MdDelete /> Excluir
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
