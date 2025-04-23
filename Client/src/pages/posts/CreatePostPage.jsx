import React from "react";
import CreatePostForm from "../../components/posts/CreatePostForm"; // Asumiendo esta ubicación
import { Container } from "react-bootstrap";

const CreatePostPage = () => {
  const userId = 2; // TODO: Reemplazar por el user ID dinámico si lo tenés

  return (
    <Container className="mt-4">
      <h2>Crear nueva publicación</h2>
      <CreatePostForm userId={userId} />
    </Container>
  );
};

export default CreatePostPage;