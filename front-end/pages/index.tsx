import Head from "next/head";
import styles from "../styles/Home.module.css";
import { db } from "../config";
import { useEffect, useState } from "react";
import User from "../components/User";
import { Row, Layout } from "antd";
import "antd/dist/antd.css";
import Greeting from "../components/Greeting";
import { UserList } from "../components/UserList";

const { Header, Footer } = Layout;

export default function Home() {
  return (
    <Header>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HI! asdf asdf asdf asdf Sign up for our thing.. :)
        </h1>

        <Row>
          <Greeting />
        </Row>

        <UserList />
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
