'use client'

import Pagina2 from "@/app/components/Pagina2"
import { Card, Row, Col, Modal, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { AiOutlineExclamationCircle } from "react-icons/ai" // Ícone de alerta

export default function Exames() {
    const [exames, setExames] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [exameSelecionado, setExameSelecionado] = useState(null)

    useEffect(() => {
        setExames(JSON.parse(localStorage.getItem('exames')) || [])
    }, [])

    const handleShowModal = (exame) => {
        setExameSelecionado(exame)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setExameSelecionado(null)
    }

    return (
        <Pagina2 titulo="Exames">
            <br></br>
            <Row xs={1} md={2} lg={3} className="g-4">
                {exames.map((item) => (
                    <Col key={item.id}>
                        <Card className="text-center">
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
                                <Card.Text
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleShowModal(item)}
                                >
                                    + Saiba mais
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal */}
            {exameSelecionado && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{exameSelecionado.nome}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {exameSelecionado.imagem && (
                            <img
                                src={exameSelecionado.imagem}
                                alt={exameSelecionado.nome}
                                className="w-100 mb-3"
                                style={{ borderRadius: '8px' }}
                            />
                        )}
                        <p>{exameSelecionado.descricao}</p>
                        <div className="text-danger d-flex align-items-center mt-3">
                            <AiOutlineExclamationCircle size={24} className="me-2" />
                            Consulte a disponibilidade nas clínicas.
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Pagina2>
    )
}
