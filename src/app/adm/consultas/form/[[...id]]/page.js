'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Tooltip, OverlayTrigger, Container } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { useState, useEffect } from "react";
import { ConsultaValidator } from "@/validators/ConsultaValidator"; // Certifique-se de importar o validator

export default function ConsultasForm({ params }) {
  const route = useRouter();
  const [consultas, setConsultas] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const storedMedicos = JSON.parse(localStorage.getItem('medicos')) || [];
    setMedicos(storedMedicos);
  }, []);

  useEffect(() => {
    const storedConsultas = JSON.parse(localStorage.getItem('consultas')) || [];
    setConsultas(storedConsultas);
  }, []);

  const consulta = consultas.find(item => item.id === params.id) || { especialidade: '', medico: '', crm: '', data: '', horarios: [], observacoes: '' };
  const [horarios, setHorarios] = useState(consulta.horarios || []);

  function adicionarHorario() {
    setHorarios([...horarios, '']);
  }

  function removerHorario(index) {
    const novosHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(novosHorarios);
  }

  function salvar(dados) {
    dados.horarios = horarios;

    let consultasAtualizadas;
    if (consulta.id) {
      consultasAtualizadas = consultas.map(item => item.id === consulta.id ? { ...item, ...dados } : item);
    } else {
      dados.id = v4();
      consultasAtualizadas = [...consultas, dados];
    }

    localStorage.setItem('consultas', JSON.stringify(consultasAtualizadas));
    setConsultas(consultasAtualizadas);
    route.push('/adm/consultas');
  }

  return (
    <Pagina titulo="Consultas">
      <Container className="p-4 my-4 bg-light rounded shadow-sm">
        <h2 className="text-center mb-4">Cadastro de Consulta</h2>
        <Formik
          initialValues={consulta}
          validationSchema={ConsultaValidator} // Aplica o schema de validação
          onSubmit={values => salvar(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="especialidade">
                <Form.Label>Especialidade</Form.Label>
                <Form.Select
                  name="especialidade"
                  value={values.especialidade}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma especialidade</option>
                  {medicos.map((medico, index) => (
                    <option key={index} value={medico.especialidade}>
                      {medico.especialidade}
                    </option>
                  ))}
                </Form.Select>
                {touched.especialidade && errors.especialidade && (
                  <div className="text-danger">{errors.especialidade}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="medico">
                <Form.Label>Médico</Form.Label>
                <Form.Select
                  name="medico"
                  value={values.medico}
                  onChange={handleChange}
                >
                  <option value="">Selecione um médico</option>
                  {medicos.map((medico, index) => (
                    <option key={index} value={medico.nome}>
                      {medico.nome}
                    </option>
                  ))}
                </Form.Select>
                {touched.medico && errors.medico && (
                  <div className="text-danger">{errors.medico}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="crm">
                <Form.Label>CRM</Form.Label>
                <Form.Select
                  name="crm"
                  value={values.crm}
                  onChange={handleChange}
                >
                  <option value="">Selecione o crm</option>
                  {medicos.map((medico, index) => (
                    <option key={index} value={medico.crm}>
                      {medico.crm}
                    </option>
                  ))}
                </Form.Select>
                {touched.crm && errors.crm && (
                  <div className="text-danger">{errors.crm}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="data">
                <Form.Label>Data da Consulta</Form.Label>
                <Form.Control
                  type="date"
                  name="data"
                  value={values.data}
                  onChange={handleChange}
                />
                {touched.data && errors.data && (
                  <div className="text-danger">{errors.data}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="horarios">
                <Form.Label>Horários da Consulta</Form.Label>
                {horarios.map((horario, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="time"
                      value={horario}
                      onChange={(e) => {
                        const novosHorarios = [...horarios];
                        novosHorarios[index] = e.target.value;
                        setHorarios(novosHorarios);
                      }}
                    />
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => removerHorario(index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  onClick={adicionarHorario}
                  className="mt-2"
                >
                  Adicionar Horário
                </Button>
                {touched.horarios && errors.horarios && (
                  <div className="text-danger">{errors.horarios}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="observacoes">
                <Form.Label>Observações</Form.Label>
                <Form.Control
                  as="textarea"
                  name="observacoes"
                  value={values.observacoes}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" className="me-3">
                  <FaCheck /> Salvar
                </Button>
                <Link href="/adm/consultas" className="btn btn-secondary">
                  <MdArrowBack /> Voltar
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Pagina>
  );
}
