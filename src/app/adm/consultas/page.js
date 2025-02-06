'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Button, Card } from "react-bootstrap"
import { FaPlusCircle, FaRegEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useEffect, useState } from "react"

export default function Consultas() {
    const [consultas, setConsultas] = useState([])
    

    useEffect(() => {
        setConsultas(JSON.parse(localStorage.getItem('consultas')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = consultas.filter(item => item.id !== id)
            localStorage.setItem('consultas', JSON.stringify(dados))
            setConsultas(dados)
        }
    }

    return (
        <Pagina titulo="Consultas">
            <Link href="/adm/consultas/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Nova Consulta
            </Link>

            <div className="d-flex flex-wrap gap-3">
                {consultas.map((item, i) => (
                    <Card key={item.id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Consulta {i + 1}</Card.Title>
                            <Card.Text>
                                <strong>Especialidade:</strong> {item.especialidade} <br />
                                <strong>Médico:</strong> {item.medico} <br />
                                <strong>CRM:</strong> {item.crm} <br />
                                <strong>Horários:</strong> 
                                <ul>
                                    {item.horarios && item.horarios.length > 0 ? (
                                        item.horarios.map((horario, index) => (
                                            <li key={index}>{horario}</li>
                                        ))
                                    ) : (
                                        <li>Nenhum horário registrado</li>
                                    )}
                                </ul>
                                <strong>Observações:</strong> {item.observacoes}
                            </Card.Text>
                            <div className="d-flex justify-content-between">
                                <Link href={`/adm/consultas/form/${item.id}`}>
                                    <FaRegEdit className="text-primary" title="Editar" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Pagina>
    )
}
