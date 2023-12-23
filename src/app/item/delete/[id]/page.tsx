// src/app/item/delete/[id]/page.tsx
// 個別アイテム削除ページ

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../Header";
import { Box, Container, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import AdminHeader from "@/app/components/AdminHeader";
import DeleteForm from "./DeleteForm";

// {params}でクリックしたアイテムid（を含むオブジェクト）にアクセスできる．
const DeleteSingleItem = async ({ params }: { params: { id: string } }) => {
	// console.log('△paramsは、', params)
	// 表示結果
	//   ↓
	// "△paramsは、 { id: '656809a035cb1609ceb947e1' }"

	const res = await fetch(
		`https://my-portfolio-atomyah.vercel.app/api/item/${params.id}`,
		{
			cache: "no-store",
		}
	);
	const singleItem = await res.json();

	// console.log('▽singleItemは、', singleItem)
	// 表示結果
	//   ↓
	// ▽singleItemは、 {
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
			<Container maxWidth="sm">
				<Box mb={6} mt={6}>
					<Typography align="center" fontSize={18}>
						<br />
						アイテム削除ページ
					</Typography>
				</Box>
				<Box>
					<DeleteForm singleItem={singleItem} />
				</Box>
			</Container>
		</>
	);
};

export default DeleteSingleItem;
