'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Button, Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function Locais() {

    const [locais, setLocais] = useState([])

    useEffect(() => {
        setLocais(JSON.parse(localStorage.getItem('locais')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = locais.filter(item => item.id != id)
            localStorage.setItem('locais', JSON.stringify(dados))
            setLocais(dados)
        }
    }

    return (
        <Pagina titulo="Locais">
            <Link href="/adm/locais/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Cep</th>
                    </tr>
                </thead>
                <tbody>
                    {locais.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/adm/locais/form/${item.id}`}>
                                    <FaRegEdit className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.endereco}</td>
                            <td>{item.telefone}</td>
                            <td>{item.cep}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
