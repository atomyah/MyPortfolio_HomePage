// src/app/item/[id].tsx 個別アイテム表示ページ

import React from 'react'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import Head from "next/head";
import Script from 'next/script'
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import SinglePageView from './SinglePageView';


const ReadSingleItem = async ( { params }: { params: { id: string } } ) => {
    // {params}でクリックしたアイテムid（を含むオブジェクト）にアクセスできる．なぜか不明．
    // コンソールで確認すると↓、"△ { id: '656809a035cb1609ceb947e1' }" と表示される．
    console.log('△', params) 

    const res = await fetch(`http://localhost:3000/api/item/${params.id}`, { cache: "no-store" });
    const singleItem = await res.json();

    // console.log('▽', singleItem)
    // ↓ のように表示される．
    // ▽ {
    //     message: 'アイテム１件読み取り成功',
    //     singleItem: {
    //       _id: '656806a735cb1609ceb947db',
    //       title: 'X(旧Twitter)ボット',
    //       image: 'project01.png',
    //       description: 'AWS Lambda, API Gateway, DynamoDBとTwitter account activity APIで構築。ツイッ ターのAccount Activity APIに呼応して、フォローされたらフォロバ、イイネがされたら「ありがとうございます！」のリプを返すようにした。',
    //       email: 'atom@example..',
    //       __v: 0
    //     }
    //   }

    const handleImageClick = () => {
      // 画像がクリックされたときに新しいウィンドウを開く
      window.open(singleItem.singleItem.image, '_blank');
    };

  return (
        <>
        <div className={styles.navContainer}>
            <Header />
        </div>
        <Container maxWidth="sm">
          <SinglePageView singleItem={singleItem} />
        </Container>
      </>
  )
}

export default ReadSingleItem