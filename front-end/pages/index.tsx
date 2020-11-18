import Head from "next/head";
import styles from "../styles/Home.module.css";
import { db } from "../config";
import { useEffect, useState } from "react";
import User from "../components/User";
import NewUserForm from "../components/NewUserForm";
import { Card, Col, Row, Layout } from "antd";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

const userCollection = db.collection("users");

export default function Home() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const newUsers = [];
    const snapshot = await userCollection.get();
    snapshot.forEach((x) => {
      newUsers.push(x.data());
    });
    setUsers(newUsers);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Header>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>HI! Sign up for our thing.. :)</h1>

        <Row>
          <Col xs={24} sm={10} style={{ margin: 10 }}>
            <Card title="New User">
              <NewUserForm onSuccess={getUsers} />
            </Card>
          </Col>

          <Col xs={24} sm={10} style={{ margin: 10 }}>
            <Card title="User List">
              <h4>...these people have! (don't do it forreal)</h4>
              {users.map((user, index) => (
                <User key={`${user.uid}-${index}`} {...user} />
              ))}
            </Card>
          </Col>
        </Row>
      </main>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </Footer>
    </Header>
  );
}
