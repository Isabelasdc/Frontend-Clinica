'use client';

import { useEffect, useState } from 'react';
import Pagina from "@/app/components/Pagina";
import { Table } from 'react-bootstrap';

export default function Pacientes() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        // Recupera os clientes cadastrados do localStorage
        const clientesCadastrados = JSON.parse(localStorage.getItem('clientes')) || [];
        setClientes(clientesCadastrados);
    }, []);

    return (
        <Pagina titulo="Pacientes Cadastrados">
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    Nenhum paciente cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Pagina>
    );
}
