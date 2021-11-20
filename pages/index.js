import Head from "next/head";
import axios from "axios";
import MainPage from "../components/MainPage";

export default function Home({ userIp }) {
  return (
    <div>
      <Head>
        <title>IP Tracker</title>
        <meta
          name="description"
          content="IP address/Domain tracker created by Nextjs"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
      </Head>

      <div>
        <MainPage userIp={userIp} />
      </div>
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
