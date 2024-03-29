// src/app/thanks/page.tsx
// お問い合わせページより送信後に表示する「送信完了」ページ

import React from "react";
import Header from "../Header";
import styles from "./page.module.css";
import { Typography } from "@mui/material";

const thanks = () => {
  return (
    <>
      <div className={styles.navContainer}>
        <Header />
      </div>
      <div className={styles.container}>
        <Typography
          align="center"
          fontSize={14}
          sx={{ backgroundColor: "#fff", height: 100, width: "auto" }}
        >
          <br />
          送信完了いたしました。
          <br />
          ご返答までしばらくお待ちください。
        </Typography>
      </div>
    </>
  );
};

export default thanks;
