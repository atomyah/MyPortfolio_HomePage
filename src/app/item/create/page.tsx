/* src/app/item/crate/page.tsx 
アイテム登録ページ */
"use client";

import React, { useState } from "react";
import {
	Box,
	Button,
	Container,
	FormControl,
	Link,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../../Header";
//import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import AdminHeader from "@/app/components/AdminHeader";
import useAuth from "@/utils/useAuth";
import ImgInput from "@/app/components/ImgInput";

// フォームの型
type CreateForm = {
	title: string;
	image: string;
	description: string;
	email?: string;
};

// バリーデーションルール（yupを使ってルールを簡単に作成）
const schema = yup.object({
	title: yup
		.string()
		.max(20, "20文字以下で入力してください")
		.required("必須項目です"),
	image: yup
		.string()
		.max(500, "500文字以下で入力してください")
		.required("必須項目です"),
	description: yup
		.string()
		.min(200, "最低２００文字含めてください")
		.required("必須項目です"),
});

const CreatePage = () => {
	//const [createSuccess, setCreateSuccess] = useState<boolean>(false);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const router = useRouter();

	// react-hook-formライブラリから,{...register("email")}の形で各入力欄を命名し、
	// ButtonタグにonClick={handleSubmit(onSubmit)}と書くだけで送信処理onSubmit:...を発火できる
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }, // バリデーションエラーの際、エラーメッセージを表示させるために必要
	} = useForm<CreateForm>({
		// yupのスキーマをReact Hook Formに適用．
		resolver: yupResolver(schema),
		defaultValues: {
			// やはりコレないと追加後フォームリセットされない。
			title: "",
			image: "",
			description: "",
		},
	});

	// フォーム送信時の処理（バリデーションOKな時に実行される）
	const onSubmit: SubmitHandler<CreateForm> = async (data) => {
		const response = await fetch(
			"https://my-portfolio-atomyah.vercel.app/api/item/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
					// トークンを読み取り"authorization"フィールドをheadersに追加.
					// middleware.tsの27行目req.headers.authorizationで使う．Bearerの文字列は無くても良い．
				},
				body: JSON.stringify(data),
			}
		);

		//console.log('■dataは、', data); 表示結果→ Object email:"yyy@yyyy.com" name:"test" password:"...."
		//console.log('▲JSON.stringify(data)); 表示結果→ {"name":"test", "email":"yyy@yyyy.com", "password":"..."}

		if (response.status === 200) {
			//setCreateSuccess(true);
			//reset() // フォームのリセット
			router.push(
				"https://my-portfolio-atomyah.vercel.app/item/create/created"
			); // 「追加完了！」メッセージページへリダイレクト.
		} else {
			alert("正常に追加できませんでした");
			reset(); // フォームのリセット
		}
	};

	////////////////////////////////////////////////////////////////////////////////////
	//// 認証チェック. JWTデコードemailがあれば追加ページを表示.///
	////////////////////////////////////////////////////////////////////////////////////

	// utils/useAuth.tsのJWT.verifyからユーザーemailを取得する.
	const loginUser = useAuth();

	//console.log('●loginUserは', loginUser); 表示結果→ ●loginUserは atom@...bz..

	////////////////////////////////////////////////////////////////////////////////////
	//// 認証チェック. ここまで.///
	////////////////////////////////////////////////////////////////////////////////////

	if (loginUser) {
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
							アイテム追加ページ
						</Typography>
						<br />
						{/* {createSuccess && 
            <div>
              <p style={{ color: 'mediumvioletred', fontSize: '16px' }}>アイテム追加が完了しました</p>
                <br />
                <span><Link href="/">トップページで確認</Link></span>
            </div>
        } */}
					</Box>
					<Box>
						<FormControl fullWidth>
							<Stack spacing={2} direction="column">
								<TextField
									size="small"
									variant="filled"
									type="text"
									required
									label="タイトル"
									{...register("title")}
									error={"title" in errors}
									helperText={errors.title?.message}
									value={title}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setTitle(e.target.value)
									}
								/>

								{/* ↓ Cludinaryへのアップロードコンポーネント */}
								<ImgInput setImage={setImage} />

								<TextField
									size="small"
									required
									type="text"
									variant="filled"
									label="画像"
									{...register("image")}
									error={"image" in errors}
									helperText={errors.image?.message}
									value={image}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setImage(e.target.value)
									}
								/>
								<TextField
									size="small"
									required
									variant="filled"
									label="説明"
									multiline
									rows={9}
									{...register("description")}
									error={"description" in errors}
									helperText={errors.description?.message}
									value={description}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setDescription(e.target.value)
									}
								/>
							</Stack>
							<Stack alignItems="center" mt={3}>
								<Button
									color="primary"
									variant="contained"
									size="large"
									sx={{ width: "200px" }}
									onClick={handleSubmit(onSubmit)}
								>
									追加する
								</Button>
							</Stack>

							<Box height="10vh"></Box>
						</FormControl>
					</Box>
				</Container>
			</>
		);
	}
};

export default CreatePage;
