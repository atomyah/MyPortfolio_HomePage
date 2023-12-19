// src/app/item/update/updated/page.tsx 
// 編集完了！ページ. 編集ページで編集成功するとrouter.pushでこのページにリダイレクト．

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
          編集完了！
          <br />
          <br />
          <Link href="/">トップページで確認</Link>
        </Typography>
      </div>
    </>
  );
};

export default thanks;