import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IP Tracker</title>
        <meta
          name="description"
          content="IP address/Domain tracker created by Nextjs"
        />
        <link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
      </Head>

      <main>coming soon...</main>
    </div>
  );
}

export async function getStaticProps() {
  // fetching ip address of user on initial load

  const response = await fetch("https://api.ipify.org/?format=json");
  const ip = await response.json();
  console.log(ip.ip);
  return {
    props: {},
  };
}
