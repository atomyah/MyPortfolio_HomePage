// src/app/item/delete/DeleteForm.tsx 個別アイテム削除ページに埋め込むフォームコンポーネント
"use client";

import React, { useState, useEffect } from 'react'
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
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../../../Header";
//import { useRouter } from "next/navigation"; //"next/router"ではなくなった．
import { useRouter } from "next/navigation";
import useAuth from '@/utils/useAuth';

// 型定義．元々のsingleItemオブジェクトの型定義
type singleItemDataType = {
    message: string,
    singleItem: {
        _id: string,
        title: string,
        image: string,
        description: string,
        email?: string
    }
}
// propsで渡されるsingleItemを型定義
type DeleteFormProps = {
    singleItem: singleItemDataType;
}
// フォームの型
type DeleteForm = {
    title: string,
    image: string,
    description: string,
    email?: string,
  };


const DeleteForm = ({ singleItem }: DeleteFormProps) => {
    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    // const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }, // バリデーションエラーの際、エラーメッセージを表示させるために必要
      } = useForm<DeleteForm>({
        // yupのスキーマをReact Hook Formに適用．

    });


      // フォーム送信時の処理（バリデーションOKな時に実行される）
    const onSubmit: SubmitHandler<DeleteForm> = async (data) => {
        const response = await fetch(`https://my-portfolio-atomyah.vercel.app/api/item/delete/${singleItem.singleItem._id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}` 
            // トークンを読み取り"authorization"フィールドをheadersに追加.
            // middleware.tsの27行目req.headers.authorizationで使う．Bearerの文字列は無くても良い．
        },
        // body: JSON.stringify(data), 削除なのでbody渡しは不要
        });
        //console.log('■', data) // Object email:"yyy@yyyy.com" name:"test" password:"...."
        //console.log('▲', JSON.stringify(data)) // {"name":"test", "email":"yyy@yyyy.com", "password":"..."}
        if (response.status === 200) {
            setDeleteSuccess(true);
            reset() // フォームのリセット
            //router.push("https://my-portfolio-atomyah.vercel.app/item/update/updated")
        } else {
            alert("正常に削除できませんでした");
            reset() // フォームのリセット
        }
    };

    //// 認証チェック. JWTデコードemailとログインユーザーemailが同じなら削除ページを表示.////
    //// useEffect()で非同期処理をしないと、}else{<h1>権限がありません</h1>}が一瞬表示されてしまう.////

    // utils/useAuth.tsのJWT.verifyからユーザーemailを取得する.
    const loginUser = useAuth();
    console.log('●loginUserは', loginUser) // ●loginUserは atom@...bz と表示.

    useEffect(() => {
        // ユーザーの認証が完了したら権限を設定
        setIsAuthorized(loginUser === singleItem?.singleItem.email);
    }, [loginUser, singleItem]);

    if (isAuthorized === null) {
        // 認証が完了していない場合はローディングまたは何も表示しない
        return null;
    }    
    //// 認証チェック. ここまで.////
    
    

    if(isAuthorized){
        return (
            <>
                <Box mb={6} mt={6}>
                </Box>
                <Box>
                    <FormControl fullWidth>
                    <Stack spacing={2} direction="column">
                        <Box p={1} sx={{color:'red', fontSize:'16', textAlign: 'center'}}>
                        {deleteSuccess ? 
                            <p style={{ color: 'red', fontSize: '16px' }}>下記のアイテムは削除されました
                                <br />
                                <span><Link href="/">トップページで確認</Link></span>
                            </p> : 
                            <p style={{ color: 'red', fontSize: '16px' }}>次のアイテムを削除しますか？</p>}
                        </Box>
                        <Box p={1} sx={{color:'#678', fontSize:'16', textAlign: 'left'}}>
                            タイトル：{singleItem?.singleItem?.title}
                            <br />
                            説明：{singleItem?.singleItem?.description}
                        </Box>
                    </Stack>
                    <br />
                    <Stack alignItems="center" mt={3}>
                    {!deleteSuccess && (
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            sx={{ width: "200px" }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            削除する
                        </Button>
                    )}

                    </Stack>

                    <Box height="10vh"></Box>
                    </FormControl>
                </Box>
            </>

        )
    }
}

export default DeleteForm