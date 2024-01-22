// src/app/item/update/updateForm.tsx
// 個別アイテム編集ページに埋め込むフォームコンポーネント.

"use client";

import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Container,
	FormControl,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../../../Header";
//import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminHeader from "@/app/components/AdminHeader";
import { useRouter } from "next/navigation";
import useAuth from "@/utils/useAuth";
import ImgInput from "@/app/components/ImgInput";

// 型定義．元々のsingleItemオブジェクトの型定義
type singleItemDataType = {
	message: string;
	singleItem: {
		_id: string;
		title: string;
		image: string;
		description: string;
		email?: string;
	};
};
// propsで渡されるsingleItemを型定義
type UpdateFormProps = {
	singleItem: singleItemDataType;
};
// フォームの型
type UpdateForm = {
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

const UpdateForm = ({ singleItem }: UpdateFormProps) => {
	// const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
	const [title, setTitle] = useState(singleItem?.singleItem?.title);
	const [image, setImage] = useState(singleItem?.singleItem?.image);
	const [description, setDescription] = useState(
		singleItem?.singleItem?.description
	);
	const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }, // バリデーションエラーの際、エラーメッセージを表示させるために必要
	} = useForm<UpdateForm>({
		// yupのスキーマをReact Hook Formに適用．
		resolver: yupResolver(schema),
		// defaultValues: {
		//     title: singleItem?.singleItem?.title || '',
		//     image: singleItem?.singleItem?.image || '',
		//     description: singleItem?.singleItem?.description || '',
		// },
	});

	// フォーム送信時の処理（バリデーションOKな時に実行される）
	const onSubmit: SubmitHandler<UpdateForm> = async (data) => {
		const response = await fetch(
			`https://my-portfolio-atomyah.vercel.app/api/item/update/${singleItem.singleItem._id}`,
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

		// console.log('dataは、', data) // Object email:"yyy@yyyy.com" name:"test" password:"...."
		// console.log('JSON.stringify(data)は、', JSON.stringify(data)) // {"name":"test", "email":"yyy@yyyy.com", "password":"..."}

		if (response.status === 200) {
			// setUpdateSuccess(true);
			router.push(
				"https://my-portfolio-atomyah.vercel.app/item/update/updated"
			); // 「編集完了！」メッセージページへリダイレクト.
		} else {
			alert("正常に編集できませんでした");
			reset(); // フォームのリセット
		}
	};

	////////////////////////////////////////////////////////////////////////////////////
	//// 認証チェック. JWTデコードemailとログインユーザーemailが同じなら編集ページを表示.///
	////////////////////////////////////////////////////////////////////////////////////

	// utils/useAuth.tsのJWT.verifyからユーザーemailを取得する.
	const loginUser = useAuth();

	// console.log('●loginUserは', loginUser) // ●loginUserは atom@...bz と表示.

	//// useEffect()で非同期処理をしないとreturn以下のHTMLが一瞬表示されてしまう.////
	useEffect(() => {
		// ユーザーの認証が完了したら権限を設定（isAuthorizedをtrueに）.
		setIsAuthorized(loginUser === singleItem?.singleItem.email);
	}, [loginUser, singleItem]);

	if (isAuthorized === null) {
		// 認証が完了していない場合は何も表示しない
		return null;
	}
	////////////////////////////////////////////////////////////////////////////////////
	//// 認証チェック. ここまで.///
	////////////////////////////////////////////////////////////////////////////////////

	if (isAuthorized) {
		return (
			<>
				<Box mb={6} mt={6}>
					{/* {updateSuccess && <p style={{ color: 'mediumvioletred', fontSize: '16px' }}>アイテム編集が完了しました</p>} */}
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
								編集する
							</Button>
						</Stack>

						<Box height="10vh"></Box>
					</FormControl>
				</Box>
			</>
		);
	}
};

export default UpdateForm;
