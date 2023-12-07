//app/item/update/updated/page.tsx 編集完了！ページ
// 編集(item/update/[id]/page.tsx_<UpdateForm.tsx>で編集成功すると)
// router.push("https://my-portfolio-atomyah.vercel.app//item/update/updated") でこのページに飛ばす．

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
        </Typography>
        <p><Link href="/">トップページで確認</Link></p>
      </div>
    </>
  );
};

export default thanks;