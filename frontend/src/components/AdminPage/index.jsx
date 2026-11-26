import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Stadium from "./components/Stadium";
import Users from "./components/Users";
import Tickets from "./components/Tickets";
import { TabContext } from "./contexts/TabProvider";
import Games from "./fetchHook";
import Badge from 'react-bootstrap/Badge'



const AdminPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { countTab } = useContext (TabContext);

  const navItems = [
    {
      id: "1",
      title: "Users",
    },
    {
      id: "2",
      title: "Stadium",
    },
    {
      id: "3",
      title: "Tickets",
    },
    {
      id: "4",
      title: "Games",
      count: countTab
    },
    {
      id: "5",
      title: "Coluna extra2",
    },
  ];

  const items = [
    {
      id: "1",
      children: <Users />,
    },
    {
      id: "2",
      children: <Stadium />,
    },
    {
      id: "3",
      children: <Tickets />,
    },
    {
      id:"4",
      children: <Games/>
    }
  ];

  return (
    <Container className={styles.container}>
      <h1>Admin</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => {
            return (
              <NavItem key={item.id}>
                <NavLink
                  active={item.id === activePage}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.title}{" "}
                  <Badge color="primary">{item.count !== undefined && (item.count !== 0 ? `${item.count}` : "0")}</Badge>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={activePage}>
          {items.map((item) => {
            return (
              <TabPane key={item.id} tabId={item.id}>
                {item.children}
              </TabPane>
            );
          })}
        </TabContent>
      </Row>
    </Container>
  );
};

export default AdminPage;
