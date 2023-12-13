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
import { ItemModel, ItemDataType } from "@/utils/schemaModels";
import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

//// Next/font/googleフォントの設定 ////
// 参考：font.ts
import { mPlusRounded1c, ZenKakuGothicNew, SourceCodePro } from "./font";

// 型定義
interface ExtendedSavedItemDataType extends ItemDataType {
  _id: Types.ObjectId
}

const Home = () => {
  const [splashNum, setSplashNum] = useState<string>("");
  const [allItems, setAllItems] = useState<ExtendedSavedItemDataType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/item/readall`, { cache: "no-store" });
      const Items = await res.json();
      console.log('□', Items) // {message: 'アイテム全件読み取り成功', allItems: Array(6)} →allItems →0:{_id:'656806a7..},→1:{_id:'6568と表示．
                             // api/item/readall.tsの21行目から来ている↑
      setAllItems(Items.allItems) // setAllItems(Items)だとmapで’allItems.map is not a function’エラー．
                                  // Itemsはオブジェクトなのでその配下のallItems配列をセットしなければならない．
    };

    fetchData();

    const randomNum: number = Math.floor(Math.random() * 100);
    const randomNumStr: string = String(randomNum);
    // console.log("■");
    // console.log(randomNumStr);

    setSplashNum(randomNumStr); // ${splashNum}に入れるsplashNum変数を格納
  }, []);

    console.log('▽', allItems); // 40行目と同じ結果．
                                 // allItems:Array(6)と配列なので、allItems[]の中の6つのアイテムデータをmap()で取り出す．



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
          {allItems.map((item) => (
            <Grid item lg={3} md={4} sm={6} key={item._id.toString()}>
                <Box sx={{ padding: '2px', margin: '2px' }}>
                {/* カードの画像は1100px,750pxと決め打ち */}
                <Link href={`item/${item._id}`}>
                  <Image
                    className={styles.cardImg}
                    src={item.image}
                    alt=""
                    width={1100}
                    height={750}
                  />
                </Link>
                </Box> 
                <Box sx={{ padding: '2px', margin: '2px' }}>
                <Typography align="center" fontSize={16}>
                  {item.title}
                </Typography>
                <Box p={0.5} sx={{color:'dark', fontSize:'13', textAlign: 'left'}}>
                  {item.description.length > 80 ? item.description.substring(0, 80) + "..." : item.description}
                  {`　`}
                  <br />
                  <Box mr={1} sx={{color:'blue', fontSize:'14', textAlign: 'right'}}>
                  <Link href={`item/${item._id}`}>＞ READ MORE</Link>
                  </Box>
                </Box>
              </Box>  
            </Grid>
          ))}
        </Grid>


        {/* カードここまで */}
      </section>
    </div>
  );
}

export default Home