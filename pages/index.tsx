import Head from "next/head";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div>
      <Head>
        <title>KMITL | Online System For Co-Operative Education</title>
        <meta name="description" content="ระบบสหกิจออนไลน์" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>hello</div>
    </div>
  );
}
