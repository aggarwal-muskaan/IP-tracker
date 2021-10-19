import Head from "next/head";
import axios from "axios";
import MainPage from "../components/MainPage";
import styles from "../styles/Home.module.css";

export default function Home({ userIp }) {
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

      <MainPage userIp={userIp} />
    </div>
  );
}

export async function getStaticProps() {
  // fetching ip address of user on initial load

  const response = await axios("https://api.ipify.org/?format=json");
  const { ip } = await response.data;
  return {
    props: {
      userIp: ip,
    },
  };
}
