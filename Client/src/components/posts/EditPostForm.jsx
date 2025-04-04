import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function EditPostForm({ post, onCancel }) {
  const [formData, setFormData] = useState({
    title: post.title,
    location: post.location,
    description: post.description,
    user_id: post.user_id,
  });

  const [existingMedia, setExistingMedia] = useState(() => {
    try {
      return Array.isArray(post.media)
        ? post.media
        : JSON.parse(post.media || '[]');
    } catch (e) {
      return [];
    }
  });
  
  const [newMediaFiles, setNewMediaFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewMediaFiles(Array.from(e.target.files));
  };

  const removeMedia = (urlToRemove) => {
    setExistingMedia((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("user_id", formData.user_id);

    // Añadir los medios que queremos conservar
    existingMedia.forEach((url) => {
      data.append("media[]", url);
    });

    // Añadir archivos nuevos
    newMediaFiles.forEach((file) => {
      data.append("new_media[]", file);
    });

    try {
      await axios.post(`http://127.0.0.1:8000/api/post/${post.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post actualizado correctamente");
      onCancel();
    } catch (error) {
      console.error("Error actualizando el post:", error.response?.data || error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
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

      <Form.Group controlId="formExistingMedia" className="mt-3">
        <Form.Label>Imágenes actuales</Form.Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {existingMedia.map((url, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={url}
                alt={`media-${index}`}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
              />
              <Button
                variant="danger"
                size="sm"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "0 6px",
                  borderRadius: "50%",
                }}
                onClick={() => removeMedia(url)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group controlId="formNewMedia" className="mt-3">
        <Form.Label>Añadir nuevas imágenes o vídeos</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} />
      </Form.Group>

      <div className="mt-4">
        <Button variant="success" type="submit">
          Guardar
        </Button>{" "}
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
}

export default EditPostForm;



