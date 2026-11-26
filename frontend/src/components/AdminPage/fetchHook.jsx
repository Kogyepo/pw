import { Container, Row, Col } from "reactstrap";
import Table from "../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { getGames, createGame } from "../../services/api/games";
import { TabContext } from "./contexts/TabProvider";
import { useContext, useEffect } from "react";

const Games = () => {
  const { register, handleSubmit, reset } = useForm();
  const { isError, isLoading, data, load } = useGetData(getGames, 0, 0);
  const { setTab } = useContext(TabContext);

  useEffect(() => {
    setTab(data.data);
  }, [data, setTab]);

  const onSubmit = (formData) => {
    createGame(formData)
      .then((response) => {
        if (response.ok) {
          alert("Jogo criado com sucesso!");
          reset();
          load();
        } else {
          alert("Erro ao adicionar jogo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Create Game</h3>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  {...register("name")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="date">
                  Date:
                </label>
                <input
                  id="date"
                  type="text"
                  placeholder="DD-MM-YYYY"
                  required
                  {...register("date")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="image">
                  Image:
                </label>
                <input
                  id="image"
                  type="text"
                  required
                  {...register("image")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="teamHome">
                  Home Team:
                </label>
                <input
                  id="teamHome"
                  type="text"
                  required
                  {...register("team.home")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="teamVisitor">
                  Visitor Team:
                </label>
                <input
                  id="teamVisitor"
                  type="text"
                  required
                  {...register("team.visitor")}
                />
              </div>

              <Row>
                <input className="submit" type="submit" value="Criar Jogo" />
              </Row>
            </form>
          </div>
        </Col>
        <Col>
          <Table
            columns={["date", "name", "image", "team.visitor", "team.home"]}
            rows={data}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
