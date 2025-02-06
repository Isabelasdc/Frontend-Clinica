'use client'

import Pagina from "@/app/components/Pagina"
import Link from "next/link"
import { Button, Card, Col, Row, Container, Carousel, Form } from "react-bootstrap"
import { FaUserMd, FaClipboardList, FaTint, FaCalendarAlt, FaHeart, FaSearch, FaArrowRight } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function Home() {
  const [medicos, setMedicos] = useState([])
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [selectedEstado, setSelectedEstado] = useState('')
  const [selectedCidade, setSelectedCidade] = useState('')
  const [saudacao, setSaudacao] = useState('')

  useEffect(() => {
    // Carregar médicos do localStorage
    setMedicos(JSON.parse(localStorage.getItem('medicos')) || [])

    // Puxar os estados de uma API ou usar um array estático de estados
    fetch('https://servicodados.ibge.gov.br/api/v2/malhas/BR') // Exemplo de API para estados
      .then(response => response.json())
      .then(data => {
        const estadoList = data.areas.map(area => area.sigla) // Isso é um exemplo; substitua com sua lógica
        setEstados(estadoList)
      })
    
    // Carregar a saudação do localStorage
    const saudacaoSalva = localStorage.getItem('saudacao');
    if (saudacaoSalva) {
      setSaudacao(saudacaoSalva);
    }
  }, [])

  const handleEstadoChange = (e) => {
    const estado = e.target.value
    setSelectedEstado(estado)

    // Puxar cidades com base no estado selecionado
    if (estado) {
      fetch(`https://api.example.com/cidades?estado=${estado}`) // Substitua com sua API de cidades
        .then(response => response.json())
        .then(data => {
          setCidades(data)
        })
    } else {
      setCidades([])
    }
  }

  return (
    <Pagina titulo="Bem-vindo ao Saúde Fácil">

      

      {/* Pesquisa de clínicas */}
      <div className="mt-5">
        <Row className="d-flex align-items-center mb-3">
          <Col md={6}>
            <h4>
              <FaHeart style={{ color: 'red' }} /> Encontre a clínica mais próxima:
            </h4>
          </Col>
          <Col md={6}>
            <Form>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="estado">
                    <Form.Label>Selecione o estado</Form.Label>
                    <Form.Control as="select" value={selectedEstado} onChange={handleEstadoChange}>
                      <option value="">Selecione...</option>
                      {estados.map(estado => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="cidade">
                    <Form.Label>e/ou Digite a cidade</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedCidade}
                      onChange={(e) => setSelectedCidade(e.target.value)}
                      placeholder="Digite a cidade"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button
                    variant="outline-secondary" // Escolha a cor para combinar com o footer
                    onClick={() => {/* lógica para buscar */ }}
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: '#0097b2', borderColor: '#0097b2' }}
                  >
                    <span className="me-2">Buscar</span> <FaArrowRight />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Carousel de serviços */}
      <div className="mt-5">
        <Carousel className="w-100" interval={600}>
          <Carousel.Item>
            <Row className="d-flex align-items-center">
              <Col md={6}>
                <h3 style={{ color: '#007bff' }}>Consultas Médicas Especializadas</h3>
                <p>Agende suas consultas com profissionais qualificados para um atendimento de qualidade.</p>
                <Link href="/" className="btn btn-danger">Cuide da sua saúde !</Link>
              </Col>
              <Col md={6}>
                <img
                  className="d-block w-100"
                  src="https://portalhospitaisbrasil.com.br/wp-content/uploads/2020/07/saude.png"
                  alt="Primeira imagem"
                  style={{ objectFit: 'cover', height: '400px' }}
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="d-flex align-items-center">
              <Col md={6}>
                <h3 style={{ color: '#007bff' }}>Exames de Rotina</h3>
                <p>Realize exames essenciais para manter sua saúde em dia.</p>
                <Link href="/" className="btn btn-danger">Com os melhores laboratórios</Link>
              </Col>
              <Col md={6}>
                <img
                  className="d-block w-100"
                  src="https://blog.certisign.com.br/wp-content/uploads/2019/10/5-vantagens-de-ter-um-medico-na-familia.jpg"
                  alt="Segunda imagem"
                  style={{ objectFit: 'cover', height: '400px' }}
                />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="d-flex align-items-center">
              <Col md={6}>
                <h3 style={{ color: '#007bff' }}>Encontre os Melhores Médicos</h3>
                <p>Pesquise por médicos de diferentes especialidades perto de você.</p>
                <Link href="/" className="btn btn-danger">Cuidado especializado</Link>
              </Col>
              <Col md={6}>
                <img
                  className="d-block w-100"
                  src="https://sarar.com.br/wp-content/uploads/2021/02/medico-que-cuida-de-idosos.png"
                  alt="Terceira imagem"
                  style={{ objectFit: 'cover', height: '400px' }}
                />
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </div>

    </Pagina>
  )
}
