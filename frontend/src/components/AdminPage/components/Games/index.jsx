
import { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { TabContext } from "../../contexts/TabProvider";

const Games = () => {
  const { register, handleSubmit } = useForm();

  const { isError, isLoading, data } = useGetData("games", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("games");

  const { setTab } = useContext(TabContext);

  useEffect(() => {
    if (data?.data) {
      setTab(data.data.length);
    }
  }, [data, setTab]);

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

          {isLoadingPost ? (
            <div>is Loading</div>
          ) : (
            <div className={styles.container}>
              <form
                className={styles.form}
                onSubmit={handleSubmit(addData)}
              >
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="date">
                    Date:
                  </label>
                  <input
                    data-testid="date"
                    placeholder="date"
                    id="date"
                    type="date"
                    name="date"
                    required="required"
                    {...register("date")}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required="required"
                    {...register("name")}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="image">
                    Image:
                  </label>
                  <input
                    id="image"
                    type="text"
                    name="image"
                    required="required"
                    {...register("image")}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="visitor">
                    Visitor:
                  </label>
                  <input
                    id="visitor"
                    type="text"
                    name="visitor"
                    required="required"
                    {...register("team.visitor")}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="home">
                    Home:
                  </label>
                  <input
                    id="home"
                    type="text"
                    name="home"
                    required="required"
                    {...register("team.home")}
                  />
                </div>

                <input
                  data-testid="submitButton"
                  className="submit"
                  type="submit"
                />
              </form>
            </div>
          )}
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
