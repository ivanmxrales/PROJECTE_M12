import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "../../styles/posts.css";
import getAuthUser from "../../utility/getAuthUserToken";
import api from "../../lib/axios";
// import getAuthUser from "../../utility/getAuthUserToken";

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
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/post", getAuthUser());
      // await axios.post("http://127.0.0.1:8000/api/post", data, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

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
      <div class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/2 px-4">
          <Form.Group controlId="formMedia" className="mt-3 ">
            {/* Si no hay archivos, mostrar la imagen de placeholder */}
            {mediaFiles.length === 0 ? (
              <div
                className="w-full h-64 bg-gray-200 flex justify-center items-center"
                style={{ borderRadius: "6px" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 7C5.34315 7 4 8.34315 4 10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10C10 8.34315 8.65685 7 7 7ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H7.31374L14.1924 12.1214C15.364 10.9498 17.2635 10.9498 18.435 12.1214L22 15.6863V6C22 5.44772 21.5523 5 21 5ZM21 19H10.1422L15.6066 13.5356C15.9971 13.145 16.6303 13.145 17.0208 13.5356L21.907 18.4217C21.7479 18.7633 21.4016 19 21 19Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ) : (
              <div className="mb-3 d-flex flex-wrap gap-2">
                {mediaFiles.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    style={{ width: "500px", height: "500px", objectFit: "cover", borderRadius: "6px" }}
                  />
                ))}
              </div>
            )}

            {/* Input de archivos */}
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>
        </div>

        <div class="w-full md:w-1/2 px-4 bg-zinc-900 rounded-lg">
          <br />
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
          <br />
          <Form.Group controlId="formLocation">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              className="formInputC"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <br />
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

          <br />
          <Button className="mt-3 formInputC" variant="primary" type="submit">
            Crear Publicación
          </Button>
          &nbsp;
        </div>
      </div>
    </Form>
  );
}

export default CreatePostForm;
