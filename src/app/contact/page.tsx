// contactページ

"use client"; //useForm使うなら必要．

import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../Header";
import { useRouter } from "next/navigation"; //"next/router"ではなくなった．
import styles from "./page.module.css";
// ↓ npm install @hookform/resolvers yup でインストール
// yupはスキーマベースのバリデーションを行うライブラリ.
// https://dev.classmethod.jp/articles/mui-v5-rhf-v7 より．
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// フォームの型
type ContactForm = {
  name: string;
  email: string;
  message: string;
};

// バリーデーションルール（yupを使ってルールを簡単に作成）
const schema = yup.object({
  email: yup
    .string()
    .max(30, "30文字以下で入力してください")
    .required("必須項目です")
    .email("正しいメールアドレス入力してください"),
  name: yup
    .string()
    .max(30, "30文字以下で入力してください")
    .required("必須項目です"),
  message: yup
    .string()
    .max(1000, "1000文字以下で入力してください")
    .required("必須項目です"),
});

export default function Contact() {
  const router = useRouter();
  // react-hook-formライブラリから,{...register("email")}の形で各入力欄を命名し、
  // ButtonタグにonClick={handleSubmit(onSubmit)}と書くだけで送信処理onSubmit:...を発火できる
  const {
    register,
    handleSubmit,
    formState: { errors }, // バリデーションエラーの際、エラーメッセージを表示させるために必要
  } = useForm<ContactForm>({
    // yupのスキーマをReact Hook Formに適用．
    resolver: yupResolver(schema),
  });

  // フォーム送信時の処理（バリデーションOKな時に実行される）
  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const response = await fetch("api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      router.push("/thanks");
    } else {
      alert("正常に送信できませんでした");
    }
    console.log(data);
  };

  return (
    <>
      <div className={styles.navContainer}>
        <Header />
      </div>
      <Container maxWidth="md">
        <Box mb={6} mt={6}>
          <Typography align="center" fontSize={18}>
            <br />
            お問い合わせページ
          </Typography>
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
                variant="filled"
                required
                label="お名前"
                {...register("name")}
                error={"name" in errors}
                helperText={errors.name?.message}
              />
              <TextField
                size="small"
                variant="filled"
                required
                label="問い合わせ内容"
                multiline
                rows={9}
                {...register("message")}
                error={"message" in errors}
                helperText={errors.message?.message}
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
                送信する
              </Button>
            </Stack>

            <Box height="10vh"></Box>
          </FormControl>
        </Box>
      </Container>
    </>
  );
}
