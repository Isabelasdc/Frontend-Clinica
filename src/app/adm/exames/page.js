'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Button, Card, Row, Col } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function Exames() {
    const [exames, setExames] = useState([])

    useEffect(() => {
        setExames(JSON.parse(localStorage.getItem('exames')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = exames.filter(item => item.id !== id)
            localStorage.setItem('exames', JSON.stringify(dados))
            setExames(dados)
        }
    }

    return (
        <Pagina titulo="Exames">
            <Link href="exames/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            <Row xs={1} md={2} lg={3} className="g-4">
                {exames.map((item) => (
                    <Col key={item.id}>
                        <Card>
                            {item.imagem && (
                                <Card.Img
                                    variant="top"
                                    src={item.imagem}
                                    alt={item.nome}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <Card.Body>
                                <Card.Title>{item.nome}</Card.Title>
                                <Card.Text>
                                    <strong>Descrição:</strong> {item.descricao}<br />
                                   
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link href={`/adm/exames/form/${item.id}`}>
                                        <Button variant="primary">
                                            <FaRegEdit /> Editar
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => excluir(item.id)}
                                    >
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
