import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../lib/axios";
import getAuthUser from "../../utility/getAuthUserToken";
import getAuthUserId from "../../utility/getAuthUserId";
import getFormattedDateTime from "../../utility/getFormattedDateTime";

function CreateComentForm({ comentedPost,onCancel }) {
    const [comentText, setComentText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataC = new FormData();
    dataC.append("coment", comentText);
    dataC.append("dataCom",getFormattedDateTime());
    dataC.append("post_id", comentedPost);
    dataC.append("user_id", getAuthUserId());

    console.log("Coment dataC:", dataC);

    try {
      await api.post(`/api/coment`, dataC ,getAuthUser());

      alert("Coment actualitzat correctament");
      onCancel(); // Cierra el formulario de edición
    } catch (error) {
      console.error("Error al actualizar el coment:", error.response?.dataC || error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComent" className="p-6">
        
        <Form.Control
          as="textarea"
          rows={1}
          value={comentText}
          className="p-3 rounded border border-secondary w-full"
          onChange={(e) => setComentText(e.target.value)}
        />
      </Form.Group>

      <div className="mt-4 d-flex justify-content-end gap-2">
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

export default CreateComentForm;
