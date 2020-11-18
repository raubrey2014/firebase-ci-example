import Head from "next/head";
import styles from "../styles/Home.module.css";
import { db } from "../config";
import { useEffect, useState } from "react";
import User from "../components/User";

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {users.map((user) => (
          <User key={user.uid} {...user} />
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
