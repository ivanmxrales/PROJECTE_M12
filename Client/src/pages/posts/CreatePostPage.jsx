import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import getAuthUserToken from "../../utility/getAuthUserToken";

function CreatePostForm({ userId, onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    user_id: userId || "",  // lo podés pasar como prop o hardcodear por ahora
  });

  const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("user_id", formData.user_id);

    mediaFiles.forEach((file) => {
      data.append("media[]", file);
    });

    try {
      await axios.post("http://127.0.0.1:8000/api/post", getAuthUserToken() , data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post creado exitosamente");
      if (onPostCreated) onPostCreated();  // notifica a la vista padre
      setFormData({
        title: "",
        location: "",
        description: "",
        user_id: formData.user_id,
      });
      setMediaFiles([]);
    } catch (error) {
      console.error("Error al crear el post:", error.response?.data || error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group controlId="formTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formLocation">
        <Form.Label>Ubicación</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formMedia" className="mt-3">
        <Form.Label>Imágenes o videos</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="submit">
        Crear Publicación
      </Button>
    </Form>
  );
}

export default CreatePostForm;
