import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function EditComentForm({ coment, onCancel }) {
  const [comentText, setComentText] = useState(coment.coment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/coments/${coment.id}`, {
        coment: comentText,
      });

      alert("Coment actualitzat correctament");
      onCancel(); // Cierra el formulario de edición
    } catch (error) {
      //console.error("Error al actualizar el coment:", error.response?.data || error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComent">
        <Form.Label>Editar Coment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comentText}
          onChange={(e) => setComentText(e.target.value)}
        />
      </Form.Group>

      <div className="mt-3">
        <Button variant="success" type="submit">
          Guardar
        </Button>{" "}
        <Button variant="secondary" onClick={onCancel}>
          Cancel·lar
        </Button>
      </div>
    </Form>
  );
}

export default EditComentForm;
