// src/app/item/[id].tsx 個別アイテム表示ページ

import React from 'react'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";


const ReadSingleItem = async ( { params }: { params: { id: string } } ) => {
    // {params}でクリックしたアイテムid（を含むオブジェクト）にアクセスできる．なぜか不明．
    // コンソールで確認すると↓、"△ { id: '656809a035cb1609ceb947e1' }" と表示される．
    console.log('△', params) 

    const res = await fetch(`https://my-portfolio-atomyah.vercel.app/api/item/${params.id}`, { cache: "no-store" });
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
        <Container maxWidth="sm">
            <Box mb={6} mt={6}>
                <Typography align="center" fontSize={18}>
                    <br />
                    {singleItem.singleItem.title}
                </Typography>
            </Box>
            <Box sx={{ padding: '2px', margin: '2px' }}>
                {/* カードの画像は1100px,750pxと決め打ち */}
                <Link href={`item/${singleItem.singleItem._id}`}>
                  <Image
                    className={styles.cardImg}
                    src={singleItem.singleItem.image}
                    alt=""
                    width={1100}
                    height={750}
                  />
                </Link>
            </Box>
            <br />
            <Box p={1} sx={{color:'dark', fontSize:'16', textAlign: 'left'}}>
              {/* description表示箇所はサニタイズ解除↓ 文章の最初の80字以内にHTMLタグ入れると
              トップページのdescription表示箇所にはHTMLタグが見えてしまうから注意.*/}
              <div dangerouslySetInnerHTML={{ __html: singleItem.singleItem.description }} />
            </Box>
            <Box mb={6} mt={6} sx={{backgroundColor:'#eee', paddingLeft:'50px',paddingRight:'50px',paddingBottom:'30px',paddingTop:'10px'}}>
              <Typography align="center">【管理用】</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="success" href={`/item/update/${singleItem.singleItem._id}`}>
                  アイテム編集ページ
                </Button>
                <Button variant="contained" color="error" href={`/item/delete/${singleItem.singleItem._id}`}>
                  アイテム削除ページ
                </Button>
              </Box>
            </Box>
        </Container>
      </>
  )
}

export default ReadSingleItem