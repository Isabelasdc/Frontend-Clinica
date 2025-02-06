'use client'

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import Link from 'next/link';
import Pagina2 from "@/app/components/Pagina2";
import { toast, ToastContainer } from 'react-toastify'; // Importações do Toastif
import 'react-toastify/dist/ReactToastify.css';

export default function ConsultasAdmin() {
  const [consultas, setConsultas] = useState([]);
  const [horariosIndisponiveis, setHorariosIndisponiveis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null); // Estado para o horário selecionado

  useEffect(() => {
    const consultasRegistradas = JSON.parse(localStorage.getItem('consultas')) || [];
    const horariosIndisponiveisSalvos = JSON.parse(localStorage.getItem('horariosIndisponiveis')) || [];

    setConsultas(consultasRegistradas);
    setHorariosIndisponiveis(horariosIndisponiveisSalvos);
  }, []);

  const handleHorarioSelecionado = (horario, consultaId) => {
    setHorarioSelecionado(horario); // Armazena o horário selecionado
  };

  const handleMarcarHorario = () => {
    if (horarioSelecionado && consultaSelecionada) {
      const horarioIndisponivel = { consultaId: consultaSelecionada.id, horario: horarioSelecionado };
      const novosIndisponiveis = [...horariosIndisponiveis, horarioIndisponivel];

      setHorariosIndisponiveis(novosIndisponiveis);
      localStorage.setItem('horariosIndisponiveis', JSON.stringify(novosIndisponiveis));

      // Exibe o Toast de sucesso
     toast.success('Sua consulta foi agendada com sucesso!', {
      position: "top-center",  // Garante que o toast esteja no topo e centralizado
      autoClose: 3000, // Fecha automaticamente em 3 segundos
      hideProgressBar: true, // Opcional, se você quiser esconder a barra de progresso
      theme: "colored",  // Opcional, para uma aparência diferenciada
    });

      // Fechar o modal e limpar a seleção
      setShowModal(false);
      setConsultaSelecionada(null);
      setHorarioSelecionado(null);
    }
  };

  const handleAbrirModal = (consulta) => {
    setConsultaSelecionada(consulta);
    setShowModal(true);
    setHorarioSelecionado(null); // Limpa o horário selecionado ao abrir o modal
  };

  const handleFecharModal = () => {
    setShowModal(false);
    setConsultaSelecionada(null);
    setHorarioSelecionado(null); // Limpa a seleção ao fechar o modal
  };

  return (
    <Pagina2 titulo="Consultas Disponíveis">
      <Container className="mt-5">
        {consultas.length === 0 ? (
          <h4>Nenhuma consulta registrada.</h4>
        ) : (
          <Row>
            {consultas.map((consulta) => (
              <Col key={consulta.id} md={4} className="mb-4">
                <Card style={{ backgroundColor: '#B2E0F0', color: 'black' }}>
                  <Card.Body >
                    <Card.Title>{consulta.paciente}</Card.Title>
                    <Card.Text>
                      <strong>Especialidade:</strong> {consulta.especialidade}
                    </Card.Text>
                    <Card.Text>
                      <strong>Médico:</strong> {consulta.medico}
                    </Card.Text>
                    <Card.Text>
                      <strong>CRM:</strong> {consulta.crm}
                    </Card.Text>
                    <Card.Text>
                      <strong>Data:</strong> {consulta.data}
                    </Card.Text>
                    <Card.Text>
                      <strong>Observações:</strong> {consulta.observacoes}
                    </Card.Text>
                    <div className="d-flex flex-wrap">
                      {(consulta.horarios || []).map((horario, index) => {
                        const indisponivel = horariosIndisponiveis.some(
                          (h) => h.consultaId === consulta.id && h.horario === horario
                        );

                        return (
                          <div
                            key={index}
                            className={`horario-item ${indisponivel ? 'indisponivel' : 'disponivel'}`}
                            onClick={() => !indisponivel && handleHorarioSelecionado(horario, consulta.id)}
                          >
                            <div className="horario-info">
                              <strong>{horario}</strong>
                              <div>{indisponivel ? 'Indisponível' : 'Disponível'}</div>
                              <Button
                                variant={indisponivel ? 'secondary' : 'success'}
                                className={`mt-2 ${indisponivel ? 'btn-disabled' : ''} me-2`}
                                onClick={() => !indisponivel && handleHorarioSelecionado(horario, consultaSelecionada.id)}
                                disabled={indisponivel}
                              >
                                {indisponivel ? 'Indisponível' : 'Disponível'}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Button variant="primary" className="mt-2" onClick={() => handleAbrirModal(consulta)}>
                      Marcar Horário
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <Link href="/clientes/home  " className="btn btn-secondary mt-3">
          Voltar
        </Link>
      </Container>

      {/* Modal para exibir os horários */}
      {consultaSelecionada && (
        <Modal show={showModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Marcar Horário - {consultaSelecionada.paciente}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Horários Disponíveis:</h5>
            <div className="d-flex flex-wrap">
              {consultaSelecionada.horarios?.map((horario, index) => {
                const indisponivel = horariosIndisponiveis.some(
                  (h) => h.consultaId === consultaSelecionada.id && h.horario === horario
                );

                return (
                  <div
                    key={index}
                    className={`horario-item ${indisponivel ? 'indisponivel' : 'disponivel'} text-center me-3 mb-3`}
                    style={{ width: '120px' }}
                  >
                    <strong>{horario}</strong>
                    <Button
                      variant={indisponivel ? 'secondary' : 'success'}
                      className={`mt-2 ${indisponivel ? 'btn-disabled' : ''}`}
                      onClick={() => !indisponivel && handleHorarioSelecionado(horario, consultaSelecionada.id)}
                      disabled={indisponivel}
                    >
                      {indisponivel ? 'Indisponível' : 'Disponível'}
                    </Button>
                  </div>
                );
              })}
            </div>
            {horarioSelecionado && (
              <Button variant="success" className="mt-3" onClick={handleMarcarHorario}>
                Confirmar Horário
              </Button>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleFecharModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Container do Toastify */}
      <ToastContainer />
    </Pagina2>
  );
}
