import Head from "next/head";
// import { useEffect } from "react";
import axios from "axios";
import MainPage from "../components/MainPage";

export default function Home({ userIp }) {
  // useEffect(() => {
  //   window.addEventListener("orientationchange", checkOrientationChange);
  // }, []);

  // function checkOrientationChange() {
  //   console.log("lock");
  //   let screenOrientation = window.orientation;
  //   switch (screenOrientation) {
  //     case 0:
  //       console.log("you are in portrait-primary mode");
  //       break;
  //     case 90:
  //       goFullScreen();
  //       break;
  //     case 180:
  //       goFullScreen();
  //       break;
  //     case 270:
  //       goFullScreen();
  //       break;
  //     default:
  //       console.log("implementation of screen orientation");
  //   }
  // }

  // // function to request full screen of device browser

  // function goFullScreen() {
  //   var elem = document.getElementById("__next");
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen().then(
  //       (data) => {
  //         lockScreenOrientation();
  //       },
  //       (err) => {
  //         console.log("no");
  //       }
  //     );
  //   } else if (elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     elem.mozRequestFullScreen().then(
  //       (data) => {
  //         lockScreenOrientation();
  //       },
  //       (err) => {
  //         console.log("Full Screen request failed");
  //       }
  //     );
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari & Opera */
  //     elem.webkitRequestFullscreen().then(
  //       (data) => {
  //         lockScreenOrientation();
  //       },
  //       (err) => {
  //         console.log("Full Screen request failed");
  //       }
  //     );
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     elem.msRequestFullscreen().then(
  //       (data) => {
  //         lockScreenOrientation();
  //       },
  //       (err) => {
  //         console.log("Full Screen request failed");
  //       }
  //     );
  //   }
  // }

  // //function to lock the screen. in this case the screen will be locked in portrait-primary mode.

  // function lockScreenOrientation() {
  //   screen.lockOrientationUniversal =
  //     screen.lockOrientation ||
  //     screen.mozLockOrientation ||
  //     screen.msLockOrientation;

  //   if (screen.lockOrientationUniversal("landscape-primary")) {
  //     // Orientation was locked
  //   } else {
  //     // Orientation lock failed
  //   }
  // }

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
