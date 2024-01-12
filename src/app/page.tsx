"use client";

import Image from "next/image";
import topImage from "../../public/topImage.png";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Grid, Box, Typography } from "@mui/material";
import { ItemModel, ItemDataType } from "@/utils/schemaModels";
import { Types } from "mongoose";
import Loading from "./loading"; // ローディングコンポーネントのインポート
import booksJsonData from "../data/books.json"; // 執筆物のJSONデータ

//// Next/font/googleフォントの設定 ////
// 参考：font.ts
import { mPlusRounded1c, ZenKakuGothicNew, SourceCodePro } from "./font";
import { Gentium_Book_Plus } from "next/font/google";

// 型定義 //
// ItemDataの型
interface ExtendedSavedItemDataType extends ItemDataType {
	_id: Types.ObjectId;
}

// booksJsonDataの型
interface booksJsonDataType {
	id: number;
	bookImage: string;
	bookTitle: string;
	bookSubTitle: string;
	bookURL: string;
}

const Home = () => {
	const [allItems, setAllItems] = useState<ExtendedSavedItemDataType[]>([]);
	const [loading, setLoading] = useState(true); // ローディング状態を管理

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // データ取得開始時にローディング状態をtrueに設定
			try {
				const res = await fetch(
					`https://my-portfolio-atomyah.vercel.app/api/item/readall`,
					{
						next: { revalidate: 60 },
					}
				);
				// ↑ /api/item/readall.tsの21～25行目から取得.

				const Items = await res.json();

				// console.log('Itemsは、', Items)
				// ↑表示結果：{message: 'アイテム全件読み取り成功', allItems: Array(6)} →allItems →0:{_id:'656806a7..},→1:{_id:'6568…．

				setAllItems(Items.allItems);
				// setAllItems(Items)だとmapで’allItems.map is not a function’エラー．
				// Itemsはオブジェクト.その配下のallItems配列をセットする．
			} catch {
				console.error("データの取得中にエラーが発生しました", Error);
			} finally {
				setLoading(false); // データ取得終了時にローディング状態をfalseに設定
			}
		};
		fetchData();
	}, []);

	//console.log('allItemsは、', allItems); // 45行目と同じ結果．
	//console.log('booksJsonDataは、', booksJsonData);

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.container}>
					{/* トップ画像（白紙） */}
					<figure className={styles.figure}>
						<Image src={topImage} alt="" width={1280} height={200} />
					</figure>

					{/* 画像の上のタイトル */}
					<h1 className={styles.title}>ポートフォリオ</h1>

					{/* 画像の上のメニュー */}
					<div className={styles.navContainer}>
						<Header />
					</div>
					{/* トップ画像ここまで */}

					{/* ページタイトル１ */}
					<h2>
						<Typography
							align="center"
							fontSize={20}
							fontWeight={400}
							mt={3}
							mb={3}
						>
							実績など
						</Typography>
					</h2>

					{/* アイテム（実績）を並べるギャラリー */}
					<section className={styles.gallery}>
						{/* カード */}
						<Grid
							container
							alignItems="center"
							justifyContent="flex-start"
							spacing={2}
						>
							{allItems.map((item) => (
								<Grid
									item
									lg={3}
									md={4}
									sm={6}
									mb={3}
									key={item._id.toString()}
								>
									<Box sx={{ padding: "2px", margin: "2px" }}>
										{/* カードの画像は1100px,750px. 一覧では400x270に縮小して表示. */}
										{/* 詳細ページおよびそのモーダルは1100x750で表示 */}
										<Link href={`item/${item._id}`}>
											<Image
												className={styles.cardImg}
												src={item.image}
												alt=""
												width={400}
												height={270}
											/>
										</Link>
									</Box>
									<Box sx={{ padding: "2px", margin: "2px" }}>
										<Typography align="center" fontSize={16}>
											{item.title}
										</Typography>
										<Box
											p={0.5}
											sx={{ color: "dark", fontSize: "13", textAlign: "left" }}
										>
											{item.description.length > 80
												? item.description.substring(0, 80) + "..."
												: item.description}
											{`　`}
											<br />
											<Box
												mr={1}
												sx={{
													color: "blue",
													fontSize: "14",
													textAlign: "right",
												}}
											>
												<Link href={`item/${item._id}`}>＞ READ MORE</Link>
											</Box>
										</Box>
									</Box>
								</Grid>
							))}
						</Grid>
						{/* カードここまで */}
					</section>

					{/* ページタイトル２ */}
					{/* '../data/books.json'に記述したKindle執筆本データをbooksJsonDataとして読み込みmapで表示. */}
					<h2>
						<Typography
							align="center"
							fontSize={20}
							fontWeight={400}
							mt={7}
							mb={3}
						>
							執筆物
						</Typography>
					</h2>

					{/* booksJsonData（執筆物）を並べるギャラリー */}
					<section className={styles.booksGallery}>
						<Grid container justifyContent="flex-start" spacing={1}>
							{booksJsonData.map((book: booksJsonDataType) => (
								<Grid
									item
									lg={2}
									md={2}
									sm={3}
									xs={4}
									className={styles.booksGrid}
									key={book.id.toString()}
								>
									<Box sx={{ padding: "2px", margin: "2px" }}>
										{/* カードの画像は500px,700pxと決め打ち */}
										<Link
											href={book.bookURL}
											rel="noopener noreferrer"
											target="_blank"
										>
											<Image
												className={styles.cardImg}
												src={book.bookImage}
												alt=""
												width={500}
												height={700}
											/>
										</Link>
									</Box>
									<Box sx={{ padding: "1px", margin: "1px" }}>
										<Typography align="left" fontSize={14} fontWeight={400}>
											{book.bookTitle}
										</Typography>
										<Typography align="left" fontSize={13} color="#577">
											{book.bookSubTitle}
										</Typography>
									</Box>
								</Grid>
							))}
						</Grid>
					</section>

					{/* ページタイトル３ */}
					<h2>
						<Typography
							align="center"
							fontSize={20}
							fontWeight={400}
							mt={7}
							mb={3}
						>
							職歴
						</Typography>
					</h2>
					<Grid
						container
						alignItems="center"
						justifyContent="center"
						textAlign="left"
						spacing={3}
					>
						<Box sx={{ marginTop: "20px", marginLeft: "50px" }}>
							<ul>
								<li>＜古いものから＞</li>
								<li>・外資系SIer会社にて派遣社員→正社員マネージャー3年</li>
								<li>・マイクロソフト㈱にてシステムズエンジニア5年</li>
								<li>・大手銀行にて金融インフラグループ部長代理2年</li>
								<li>
									・外資系フットウェアブランド社内情報システム部門にてインフラストラクチャーリード9年
								</li>
								<li>
									・現在フリーランス（業務は実績のとおり、主にWeb開発・デザイン）
								</li>
							</ul>
						</Box>
					</Grid>
				</div>
			)}
		</div>
	);
};
export default Home;

//////////////////////////////////////// 参考(備忘録) ///////////////////////////////////////////

///// 58行目console.log('allItemsは、', allItems);の表示結果 /////
//      ↓
// allItemsは、
// [
//   {
//       "_id": "656806a735cb1609ceb947db",
//       "title": "Next.jsでこのサイト",
//       "image": "http://res.cloudinary.com/atomyah/image/upload/v170227077・・・
//       "description": "JSフレームワークNext.js14、データベースはMongoDB、画像ファイル・・・
//       "email": "atom@yah.bz",
//       "__v": 0
//   },
//   {
//       "_id": "6568079035cb1609ceb947dd",
//       "title": "AWSでLINEボット開発",
// …以下略…

////// 59行目console.log('booksJsonDataは、', booksJsonData);の表示結果 /////
//      ↓
// booksJsonDataは、 [
//   {
//     id: 1,
//     bookImage: '/kindle01.jpg',
//     bookTitle: 'Learning MVC architecture with PHP',
//     bookSubTitle: '～ to exit beginners, before entering frameworks',
//     bookURL: ''
//   },
//   {
//     id: 2,
//     bookImage: '/kindle02.jpg',
//     bookTitle: 'Azure Active DirectoryとOffice 365でクラウドネイティブな企業インフラ構築術',
//     bookSubTitle: '　　',
//     bookURL: ''
//   },
