'use client'

import Pagina2 from "@/app/components/Pagina2"
import { Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Locais() {
    const [locais, setLocais] = useState([])

    useEffect(() => {
        // Carregando os locais armazenados no localStorage
        setLocais(JSON.parse(localStorage.getItem('locais')) || [])
    }, [])

    return (
        <Pagina2 titulo="Locais">
            <br></br>
            {/* Exibindo o Mapa com os locais */}
            <div style={{ height: '300px', width: '100%', marginBottom: '20px' }}>
                <MapContainer center={[-23.5505, -46.6333]} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locais.map((item) => (
                        item.latitude && item.longitude ? (
                            <Marker
                                key={item.id}
                                position={[item.latitude, item.longitude]} // Posição do marcador
                            >
                                <Popup>
                                    <strong>{item.nome}</strong><br />
                                    {item.endereco}<br />
                                    {item.telefone}
                                    
                                </Popup>
                            </Marker>
                        ) : null
                    ))}
                </MapContainer>
            </div>

            {/* Tabela de Locais */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Cep </th>
                    </tr>
                </thead>
                <tbody>
                    {locais.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.endereco}</td>
                            <td>{item.telefone}</td>
                            <td>{item.cep}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina2>
    )
}
