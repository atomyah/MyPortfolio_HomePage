/* ユーザーログインページ */
"use client";

import React, { useState } from 'react'
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
//import { useRouter } from "next/navigation"; //"next/router"ではなくなった．
import styles from "./page.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminHeader from '@/app/components/AdminHeader';

// フォームの型
type ContactForm = {
    email: string;
    password: string;
};

// バリーデーションルール（yupを使ってルールを簡単に作成）
const schema = yup.object({
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

const Login = () => {
     // ログイン成功メッセージの状態
    const [registerSuccess, setRegisterSuccess] = useState(false);

    // react-hook-formライブラリから,{...register("email")}の形で各入力欄を命名し、
    // ButtonタグにonClick={handleSubmit(onSubmit)}と書くだけで送信処理onSubmit:...を発火できる
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }, // バリデーションエラーの際、エラーメッセージを表示させるために必要
    } = useForm<ContactForm>({
      // yupのスキーマをReact Hook Formに適用．
      resolver: yupResolver(schema),
      defaultValues: {
        email: '',
        password: '',
      },
    });

    // フォーム送信時の処理（バリデーションOKな時に実行される）
    const onSubmit: SubmitHandler<ContactForm> = async (data) => {
        const response = await fetch("https://my-portfolio-atomyah.vercel.app//api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });
        //console.log('■', data) // Object email:"yyy@yyyy.com" name:"test" password:"...."
        //console.log('▲', JSON.stringify(data)) // {"name":"test", "email":"yyy@yyyy.com", "password":"..."}
        if (response.status === 200) {
            const jsonData = await response.json(); // api/user/login.tsの57行目より来ている↓
            // console.log('●', jsonData.token)        // return res.status(200).json({token: token})
            localStorage.setItem("token", jsonData.token) // tokenをローカルストレージに保管.（ステート変数はページリロードで消えてしまう）

            setRegisterSuccess(true);
            reset() // フォームのリセット
        } else {
            alert("正常にログインできませんでした");
            reset() // フォームのリセット
        }
        //console.log(data); // {email: 'atom@example..', password: 'aaaa1111'}
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
            ユーザーログインページ
          </Typography>
            <br />
        {registerSuccess && <p style={{ color: 'mediumvioletred', fontSize: '16px' }}>ユーザーログインが完了しました</p>}
        </Box>
        <Box>
          <FormControl fullWidth>
            <Stack spacing={2} direction="column">
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
                color="primary"
                variant="contained"
                size="large"
                sx={{ width: "200px" }}
                onClick={handleSubmit(onSubmit)}
              >
                ログインする
              </Button>
            </Stack>

            <Box height="10vh"></Box>
          </FormControl>
        </Box>
      </Container>
    </>
  )
}

export default Login