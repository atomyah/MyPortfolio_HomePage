// src/app/user/register/page.tsx
/* ユーザー登録ページ */

"use client";

import React, { useState } from "react";
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
import Header from "../../Header";
//import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminHeader from "@/app/components/AdminHeader";

// フォームの型
type RegisterForm = {
	name: string;
	email: string;
	password: string;
};

// バリーデーションルール（yupを使ってルールを作成）
const schema = yup.object({
	name: yup
		.string()
		.max(30, "30文字以下で入力してください")
		.required("必須項目です"),
	email: yup
		.string()
		.max(30, "30文字以下で入力してください")
		.required("必須項目です")
		.email("正しいメールアドレス入力してください"),
	password: yup
		.string()
		.matches(/(?=.*[a-z])/, "小文字を含めてください")
		.matches(/(?=.*[0-9])/, "数字を含めてください")
		.min(8, "最低８文字含めてください")
		.max(30, "30文字以下で入力してください")
		.required("必須項目です"),
});

const Register = () => {
	// 登録成功メッセージの状態
	const [registerSuccess, setRegisterSuccess] = useState(false);

	// react-hook-formライブラリから,{...register("email")}の形で各入力欄を命名し、
	// ButtonタグにonClick={handleSubmit(onSubmit)}と書くだけで送信処理onSubmit:...を発火できる.
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }, // バリデーションエラーの際エラーメッセージを表示させるために必要.
	} = useForm<RegisterForm>({
		// yupのスキーマをReact Hook Formに適用．
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// フォーム送信時の処理（バリデーションOKなら実行される）
	const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
		const response = await fetch(
			"https://my-portfolio-henna-sigma-88.vercel.app/api/user/register",
			{
				// /api/user/registerでは動作せず…
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		// console.log('dataは、', data) // Object email:"yyy@yyyy.com" name:"test" password:"...."
		// console.log('JSON.stringify(data)は、', JSON.stringify(data)) // {"name":"test", "email":"yyy@yyyy.com", "password":"..."}
		if (response.status === 200) {
			setRegisterSuccess(true);
			reset(); // フォームのリセット
		} else {
			alert("正常に登録できませんでした");
			reset(); // フォームのリセット
		}
		// console.log(data);
	};

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
						ユーザー登録ページ（disabled）
					</Typography>
					<br />
					{registerSuccess && (
						<p style={{ color: "mediumvioletred", fontSize: "16px" }}>
							ユーザー登録が完了しました
						</p>
					)}
				</Box>
				<Box>
					<FormControl fullWidth>
						<Stack spacing={2} direction="column">
							<TextField
								size="small"
								variant="filled"
								required
								label="お名前"
								{...register("name")}
								error={"name" in errors}
								helperText={errors.name?.message}
							/>
							<TextField
								size="small"
								required
								variant="filled"
								label="メールアドレス"
								type="email"
								{...register("email")}
								error={"email" in errors}
								helperText={errors.email?.message}
							/>
							<TextField
								size="small"
								required
								variant="filled"
								label="パスワード"
								type="password"
								{...register("password")}
								error={"password" in errors}
								helperText={errors.password?.message}
							/>
						</Stack>
						<Stack alignItems="center" mt={3}>
							<Button
								disabled // ユーザーは私一人ゆえユーザー登録ページを無効化.
								color="primary"
								variant="contained"
								size="large"
								sx={{ width: "200px" }}
								onClick={handleSubmit(onSubmit)}
							>
								登録する
							</Button>
						</Stack>

						<Box height="10vh"></Box>
					</FormControl>
				</Box>
			</Container>
		</>
	);
};

export default Register;
