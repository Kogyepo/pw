import { apiOrigin } from "../../../../services/api/config";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "./styles.module.scss";
// Assumo que estes caminhos estão corretos na tua estrutura
import { CameraMedia } from "../../../CameraMedia";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { useGetMember } from "../../../../hooks/useGetMember";

// 🔴 ATENÇÃO: Precisas de importar as funções da API! Ajusta o caminho para o ficheiro correto.
import { createMember, getMember } from "../../../../services/api/member"; 

export const Member = ({ user }) => {
  const photoOrigin = apiOrigin || "http://127.0.0.1:5000";
  const [showForm, setShowForm] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  
  const isMember = user?.role ? user.role.scopes.includes("member") : false;

  const { isLoading: isLoadingPost, addData } = usePostData((data) =>
    createMember(user._id, data)
  );
  
  const { member } = useGetMember(getMember, isMember ? user._id : null);
  const { register, handleSubmit, reset } = useForm();

  const addMember = (data) => {
    const body = {
      ...data,
      base64image: imageSrc,
    };
    addData(body);
  };

  useEffect(() => {
    if (isMember && member) {
      // Preenche o formulário com os dados do utilizador
      reset(member);
    }
  }, [member, isMember, reset]);

  // JSX Corrigido
  if (!showForm && !isMember) {
    return (
      <Button onClick={() => setShowForm(!showForm)}>
        Be a Member
      </Button>
    );
  }

  // JSX Corrigido
  return (
    <Container>
      <h2>Member Perfil</h2>

      {!isMember && (
        <form onSubmit={handleSubmit(addMember)}>
          <div>
            <label>Tax Number: </label>
            <input type="text" {...register("taxNumber")} />
          </div>
          
          {/* Espaço para o componente CameraMedia caso o uses aqui */}
          {/* <CameraMedia onCapture={(img) => setImageSrc(img)} /> */}
          
          <Button type="submit" disabled={isLoadingPost}>
            {isLoadingPost ? "A guardar..." : "Guardar"}
          </Button>
        </form>
      )}

      {isMember && member && (
        <>
          <p>Tax Number: {member.taxNumber}</p>
          <p>Photo:</p>
          {/* Se a API devolver o caminho da foto, podes mostrar assim: */}
          {member.photo && <img src={`${photoOrigin}/${member.photo.replace(/^\/+/, "")}`} alt="Profile" />}
        </>
      )}
    </Container>
  );
};
