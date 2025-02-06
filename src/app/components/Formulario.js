import React from "react";
import { Form, Button, Row, Col, Tooltip, OverlayTrigger, Container } from "react-bootstrap";

export default function FormBase({ title, fields, onSubmit, submitLabel = "Salvar" }) {
  return (
    <Container className="p-4 my-4 bg-light rounded shadow-sm">
      <h2 className="text-center mb-4">{title}</h2>
      <Form onSubmit={onSubmit}>
        {fields.map((field, idx) => (
          <Form.Group as={Row} key={idx} className="mb-3" controlId={field.name}>
            <Form.Label column sm={4} className="fw-bold">
              {field.label}
              {field.tooltip && (
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>{field.tooltip}</Tooltip>}
                >
                  <span className="ms-2 text-muted">?</span>
                </OverlayTrigger>
              )}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                required={field.required || false}
              />
            </Col>
          </Form.Group>
        ))}
        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3 px-4">
            {submitLabel}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
