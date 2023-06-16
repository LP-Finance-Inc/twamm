import NoSsr from "@mui/material/NoSsr";

import Header from "../organisms/header";
import Footer from "../organisms/footer";
import OfflineOverlay from "../organisms/offline-overlay";
import styles from "./index.module.css";
import Userspace from "../ecosystems/userspace";

export default () => (
  <div className={styles.root}>
    <OfflineOverlay />
    <Header />
    <div className={styles.main}>
      <NoSsr>
        <Userspace />
      </NoSsr>
    </div>
    <Footer />
  </div>
);
