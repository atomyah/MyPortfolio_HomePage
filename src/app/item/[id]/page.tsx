// src/app/item/[id].tsx
// 個別アイテム表示ページ

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import Head from "next/head";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import SinglePageView from "./SinglePageView";

// {params}でクリックしたアイテムid（を含むオブジェクト）にアクセスできる．
const ReadSingleItem = async ({ params }: { params: { id: string } }) => {
	// console.log('paramsは、', params); 表示結果→ "paramsは、 { id: '656809a035cb1609ceb947e1' }"

	const res = await fetch(
		`https://my-portfolio-henna-sigma-88.vercel.app/api/item/${params.id}`,
		{
			cache: "no-store",
		}
	);
	const singleItem = await res.json();

	// console.log('singleItemは、', singleItem)
	// 表示結果 ↓
	// singleItemは、 {
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
				<SinglePageView singleItem={singleItem} />
			</Container>
		</>
	);
};

export default ReadSingleItem;
