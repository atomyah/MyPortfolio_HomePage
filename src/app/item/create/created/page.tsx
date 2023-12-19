// src/app/item/update/created/page.tsx 
// 追加完了！ページ
// 追加ページで追加成功するとrouter.pushでこのページに飛ばす．

import React from "react";
import Header from "../../../Header";
import styles from "./page.module.css";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import AdminHeader from '@/app/components/AdminHeader';
import Link from "next/link";

const thanks = () => {
  return (
    <>
      <div className={styles.navContainer}>
        <Header />
      </div>
      <div className={styles.navContainerAdmin}>
        <AdminHeader />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className={styles.container}>
        <Typography
          align="center"
          fontSize={16}
          sx={{ backgroundColor: "#fff", height: 100, width: "auto" }}
        >
          <br />
          追加完了！
          <br />
          <br />
          <Link href="/">トップページで確認</Link>
        </Typography>
      </div>
    </>
  );
};

export default thanks;