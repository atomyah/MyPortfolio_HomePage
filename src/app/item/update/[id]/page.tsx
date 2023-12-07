// src/app/item/update/[id]/page.tsx 個別アイテム編集ページ
// フォームとAPIへの送信処理はUpdatedForm.tsxに分けて、<UpdateForm singleItem={singleItem} />を埋め込んでる．
// そうしないと"use client"が必要なuseFormなどが使えないので．

import React, { useState, useEffect }  from 'react'
import Image from "next/image";
import Link from "next/link";
import Header from "../../../Header";
import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./page.module.css";
import AdminHeader from '@/app/components/AdminHeader';
import UpdateForm from './UpdateForm';


const UpdateSingleItem = async ( { params }: { params: { id: string } } ) => {
    // {params}でクリックしたアイテムid（を含むオブジェクト）にアクセスできる．なぜか不明．
    // コンソールで確認すると↓、"△ { id: '656809a035cb1609ceb947e1' }" と表示される．
    console.log('△', params) 

    const res = await fetch(`https://my-portfolio-atomyah.vercel.app//api/item/${params.id}`, { next: { revalidate: 30 } });
    const singleItem = await res.json();
    
    console.log('▽', singleItem)
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


  return (
    <>
      <div className={styles.navContainer}>
        <Header />
      </div>
      <div className={styles.navContainerAdmin}>
        <AdminHeader />
      </div>
      <br />
      <Container maxWidth="md">
        <Box mb={6} mt={6}>
          <Typography align="center" fontSize={18}>
            <br />
            アイテム編集ページ
          </Typography>
        </Box>
        <Box>
          <UpdateForm singleItem={singleItem} />
        </Box>
      </Container>
    </>
  );
}

export default UpdateSingleItem