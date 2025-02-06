'use client'

import Pagina2 from "@/app/components/Pagina2"
import { Button, Col, Row, Form, Carousel } from "react-bootstrap"
import { FaArrowRight } from "react-icons/fa"
import Link from "next/link"
import { useEffect, useState } from "react"
import apiLocalidade from "@/app/service/apiLocalidade"
import { MdArrowBack } from "react-icons/md"

export default function Home() {

  const [ufs, setUfs] = useState([])
  const [cidades, setCidades] = useState([])
  const [camposBrasil, setCamposBrasil] = useState(true) // Inicializar como true
  const [values, setValues] = useState({ uf: '', cidade: '' }) // Estado para armazenar os valores selecionados

  useEffect(() => {
    // Busca os estados
    apiLocalidade.get(`estados?orderBy=nome`).then(resultado => {
      setUfs(resultado.data)
    })
  }, [])

  useEffect(() => {
    // Busca as cidades ao selecionar uma UF
    if (values.uf) {
      apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
        setCidades(resultado.data)
      })
    } else {
      setCidades([]) // Reseta as cidades quando a UF for desmarcada
    }
  }, [values.uf])

  const handleChange = (campo) => (event) => {
    setValues({ ...values, [campo]: event.target.value })
  }

  return (
    <Pagina2 titulo="Bem-vindo ao Saúde Fácil">
      <div className="mt-5">
        <Row className="d-flex align-items-center mb-3">
          <Col md={6}>
            <h4>Encontre a clínica mais próxima:</h4>
          </Col>
          <Col md={6}>
            <Form>
              <Row className="d-flex align-items-center">
                <Col md={3}>
                  {camposBrasil &&
                    <Form.Group className="mb-3" controlId="uf">
                      <Form.Label>UF</Form.Label>
                      <Form.Select
                        name="uf"
                        value={values.uf}
                        onChange={handleChange('uf')}
                      >
                        <option value=''>Selecione</option>
                        {ufs.map(item => (
                          <option key={item.sigla} value={item.sigla}>
                            {item.sigla} - {item.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  }
                </Col>
                <Col md={3}>
                  {values.uf && cidades.length > 0 &&
                    <Form.Group className="mb-3" controlId="cidade">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Select
                        name="cidade"
                        value={values.cidade}
                        onChange={handleChange('cidade')}
                      >
                        <option value=''>Selecione</option>
                        {cidades.map(item => (
                          <option key={item.nome} value={item.nome}>
                            {item.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  }
                </Col>
                <Col md={4} className="d-flex align-items-end">
             
                  <Button
                    variant="outline-secondary" // Escolha a cor para combinar com o footer
                    onClick={() => {/* lógica para buscar */ }}
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: '#0097b2', borderColor: '#0097b2' }}
                  >
                       <Link href="/clientes/locais">
                    <span className="me-2">Buscar</span> <FaArrowRight />
                    </Link>
                  </Button>
                 
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Carousel */}
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
    </Pagina2>
  )
}
