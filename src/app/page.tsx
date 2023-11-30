"use client"; //useState, useEffect使うなら必要．

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Header from "./Header";
import {
  Grid,
  Box,
  Typography,
} from "@mui/material";

//// Next/font/googleフォントの設定 ////
// 参考：font.ts
import { mPlusRounded1c, ZenKakuGothicNew, SourceCodePro } from "./font";

export default function Home() {
  // 画像プレビュー機能
  // const [preview, setPreview] = useState<string | null>(null);

  // const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { files } = e.target;
  //   if (files && files.length > 0) {
  //     setPreview(window.URL.createObjectURL(files[0]));
  //   }
  // };
  const [splashNum, setSplashNum] = useState<string>("");

  useEffect(() => {
    const randomNum: number = Math.floor(Math.random() * 100);
    const randomNumStr: string = String(randomNum);
    console.log("■");
    console.log(randomNumStr);

    setSplashNum(randomNumStr); // ${splashNum}に入れるsplashNum変数を格納
  }, []);

  console.log("▲");
  console.log(splashNum);

  return (
    <div className={styles.container}>
      {/* トップ画像 */}
      <figure className={styles.figure}>
        {/* アンスプラッシュを使うためにはnext.config.jsに設定必要 */}
        <Image
          src={`https://source.unsplash.com/collection/1346951/1280x300?sig=${splashNum}`}
          alt=""
          width={1280}
          height={300}
        />
      </figure>

      {/* 画像の上のタイトル */}

      <h1 className={styles.title}>
        Atom Yahポートフォリオ
      </h1>

      {/* 画像の上のメニュー */}
      <div className={styles.navContainer}>
        <Header />
      </div>
      {/* トップ画像ここまで */}

      {/* ページタイトル */}
      <h1>
        <Typography align="center" fontSize={20} fontWeight={400} mt={3}>
          実績など
        </Typography>
      </h1>

      {/* カードを並べるギャラリー */}
      <section className={styles.gallery}>
        {/* カード */}
        <Grid container alignItems='center' justifyContent='center' spacing={2}>
          <Grid  item lg={3} md={4} sm={6}>
              <Box sx={{ padding: '2px', margin: '2px' }}>
              {/* カードの画像は1100px,750pxと決め打ち */}
              <Link href="/">
                <Image
                  className={styles.cardImg}
                  src="/project1_1100x750.png"
                  alt=""
                  width={1100}
                  height={750}
                />
              </Link>
              </Box>   
              <Box sx={{ padding: '2px', margin: '2px' }}>
                <Typography align="center" fontSize={16}>
                  X(旧Twitter)ボット
                </Typography>
                <Box p={0.5} sx={{color:'dark', fontSize:'13', textAlign: 'left'}}>
                  AWS Lambda, API Gateway, DynamoDBとTwitter account activity
                  APIで構築
                  {`　`}
                  <br />
                  <Box mr={1} sx={{color:'blue', fontSize:'14', textAlign: 'right'}}>
                  <Link href="#">＞ READ MORE</Link>
                  </Box>
                </Box>
              </Box>
          </Grid>
          <Grid  item lg={3} md={4} sm={6}>
              <Box sx={{ padding: '2px', margin: '2px' }}>
              {/* カードの画像は1100px,750pxと決め打ち */}
              <Link href="/">
                <Image
                  className={styles.cardImg}
                  src="/project1_1100x750.png"
                  alt=""
                  width={1100}
                  height={750}
                />
              </Link>
              </Box>   
              <Box sx={{ padding: '2px', margin: '2px' }}>
                <Typography align="center" fontSize={16}>
                  X(旧Twitter)ボット
                </Typography>
                <Box p={0.5} sx={{color:'dark', fontSize:'13', textAlign: 'left'}}>
                  AWS Lambda, API Gateway, DynamoDBとTwitter account activity
                  APIで構築
                  {`　`}
                  <br />
                  <Box mr={1} sx={{color:'blue', fontSize:'14', textAlign: 'right'}}>
                  <Link href="#">＞ READ MORE</Link>
                  </Box>
                </Box>
              </Box>
          </Grid>
          <Grid  item lg={3} md={4} sm={6}>
              <Box sx={{ padding: '2px', margin: '2px' }}>
              {/* カードの画像は1100px,750pxと決め打ち */}
              <Link href="/">
                <Image
                  className={styles.cardImg}
                  src="/project1_1100x750.png"
                  alt=""
                  width={1100}
                  height={750}
                />
              </Link>
              </Box>   
              <Box sx={{ padding: '2px', margin: '2px' }}>
                <Typography align="center" fontSize={16}>
                  X(旧Twitter)ボット
                </Typography>
                <Box p={0.5} sx={{color:'dark', fontSize:'13', textAlign: 'left'}}>
                  AWS Lambda, API Gateway, DynamoDBとTwitter account activity
                  APIで構築
                  {`　`}
                  <br />
                  <Box mr={1} sx={{color:'blue', fontSize:'14', textAlign: 'right'}}>
                  <Link href="#">＞ READ MORE</Link>
                  </Box>
                </Box>
              </Box>
          </Grid>
          <Grid  item lg={3} md={4} sm={6}>
              <Box sx={{ padding: '2px', margin: '2px' }}>
              {/* カードの画像は1100px,750pxと決め打ち */}
              <Link href="/">
                <Image
                  className={styles.cardImg}
                  src="/project1_1100x750.png"
                  alt=""
                  width={1100}
                  height={750}
                />
              </Link>
              </Box>   
              <Box sx={{ padding: '2px', margin: '2px' }}>
                <Typography align="center" fontSize={16}>
                  X(旧Twitter)ボット
                </Typography>
                <Box p={0.5} sx={{color:'dark', fontSize:'13', textAlign: 'left'}}>
                  AWS Lambda, API Gateway, DynamoDBとTwitter account activity
                  APIで構築
                  {`　`}
                  <br />
                  <Box mr={1} sx={{color:'blue', fontSize:'14', textAlign: 'right'}}>
                  <Link href="#">＞ READ MORE</Link>
                  </Box>
                </Box>
              </Box>
          </Grid>
        </Grid>


        {/* カードここまで */}
      </section>
    </div>
  );
}
