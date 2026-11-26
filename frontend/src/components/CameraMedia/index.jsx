import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Webcam from "react-webcam";
import styles from "./styles.module.scss";

export const CameraMedia = ({ setImage, imageFile }) => {
  return (
    <Container className={styles.container}>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          {/* Componente Webcam com Render Props para aceder ao getScreenshot */}
          <Webcam audio={false} screenshotFormat="image/jpeg">
            {({ getScreenshot }) => (
              <Button
                className="mt-3"
                color="primary"
                onClick={(event) => {
                  event.preventDefault();
                  setImage(getScreenshot());
                }}
              >
                Capture photo
              </Button>
            )}
          </Webcam>
        </Col>
      </Row>

      {/* Secção condicional para mostrar e descarregar a imagem capturada */}
      {imageFile && (
        <Row className="mt-4">
          <Col className="d-flex flex-column align-items-center">
            <img 
              src={imageFile} 
              alt="Captured screenshot" 
              className={styles.previewImage} 
            />
            <a 
              href={imageFile} 
              download="webcam-capture.jpg"
              className="btn btn-secondary mt-2"
            >
              Download Image
            </a>
          </Col>
        </Row>
      )}
    </Container>
  );
};