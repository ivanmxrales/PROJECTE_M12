import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import getAuthUserTokenMultimedia from "../../utility/getAuthUserTokenMultimedia";
import api from "../../lib/axios";

function EditPostForm({ post, onCancel }) {
  const [formData, setFormData] = useState({
    title: post.title,
    location: post.location,
    description: post.description,
    user_id: post.user_id,
  });

  const baseUrl = 'http://127.0.0.1:8000/';
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

  const handleDelete = async (id_num) => {
    const confirmDelete = window.confirm("Estas segur?");
    if (!confirmDelete) return;

    try {
      await api.get("/sanctum/csrf-cookie");
      await api.delete(`/api/post/${id_num}`, getAuthUser());
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id_num !== id_num)
      );
      //console.log("Post esborrat");
    } catch (error) {
      //console.error("Error en esborrar l'Post:", error.response?.data || error.message);
    }
  };

  // BORRAR MEDIA

  const [mediaMarkedForDeletion, setMediaMarkedForDeletion] = useState([]);

  const toggleMediaDeletion = (url) => {
    setMediaMarkedForDeletion((prev) =>
      prev.includes(url)
        ? prev.filter((u) => u !== url)
        : [...prev, url]
    );
  };





  const handleSubmit = async (e) => {
    e.preventDefault();



    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("user_id", formData.user_id);

    // Añadir los medios que queremos conservar
    existingMedia
  .filter((url) => !mediaMarkedForDeletion.includes(url))
  .forEach((url) => {
    data.append("media[]", url);
  });


    // Añadir archivos nuevos
    newMediaFiles.forEach((file) => {
      data.append("new_media[]", file);
    });

    try {

      await api.post(`/api/post/${post.id}`, data, getAuthUserTokenMultimedia());
      // await axios.post(`http://127.0.0.1:8000/api/post/${post.id}`, data, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      alert("Post actualizado correctamente");
      onCancel();
    } catch (error) {
      //console.error("Error actualizando el post:", error.response?.data || error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4 p-4 flex flex-col gap-4">
      <Form.Group controlId="formTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control
          className="formInputC"
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
          className="formInputC"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          className="formInputC"
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
        {existingMedia.map((url, index) => {
          const isMarked = mediaMarkedForDeletion.includes(url);
          return (
            <div key={index} style={{ position: "relative" }}>
              <Button
                variant={isMarked ? "outline-danger" : "light"}
                onClick={() => toggleMediaDeletion(url)}
                style={{
                  padding: 0,
                  border: isMarked ? "2px solid red" : "2px solid transparent",
                  opacity: isMarked ? 0.5 : 1,
                  filter: isMarked ? "grayscale(100%)" : "none",
                }}
              >
                <img
                  src={baseUrl + url}
                  alt={`media-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </Button>
            </div>
          );
        })}
        </div>

      </Form.Group>

      <Form.Group controlId="formNewMedia" className="mt-3">
        <Form.Label>Añadir nuevas imágenes o vídeos</Form.Label>
        <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
      </Form.Group>

      <div className="mt-4">
        <Button variant="success" type="submit">
          Guardar
        </Button>{" "}
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(post.id)}>
          Eliminar
        </Button>
      </div>
    </Form>
  );
}

export default EditPostForm;


