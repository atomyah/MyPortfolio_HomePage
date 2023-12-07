{/* ログインするのは自分だけなのでmiddlewareでBasic認証で済ました．
register.tsもlogin.tsも（およびそれらを発火するフロントエンドのページも必要なくなった。
まだ追加すべきことはJWTの仕組みをmiddleware.tsに取り入れることができるかどうか。*/}

// pages/api/user/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { UserModel, UserDataType } from "@/utils/schemaModels";
import { Types } from 'mongoose';
// JWTのインストール
// npm install jsonwebtoken だけではダメで、TypeScriptの場合
// npm install --save-dev @types/jsonwebtoken も必要.
import jwt from "jsonwebtoken";

//jwt.sign(ペイロード, シークレットキー, 有効期限)でトークン発行．
//ペイロード＝データ．一般的にはメールアドレスやユーザー名にしておく．
const secret_key = 'myportfolio';


// 型定義
interface ResMessageType {
    message?: string,
    token?: string,
    error?: string,
}

interface ExtendedNextApiRequestUser extends NextApiRequest {
    body: UserDataType
}

interface SavedUserDataType extends UserDataType {
    _id: Types.ObjectId 
}       // ↑ MongoDB専用の型情報．import { Types } from 'mongoose'でインポート


const loginUser = async(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
    try {
        await connectDB()
        // console.log(req.body)
        const savedUserData: SavedUserDataType | null = await UserModel.findOne({email: req.body.email}); 
        // formからPOSTされたreqのreq.body.emailがMongoDBのemailフィールドに存在するかをfindしてる．
        // つまりユーザーが存在していればsavedUserDataにUserオブジェクトが格納される，
        
        // console.log(savedUserData)
        // ↓ このように表示される.
        // {
        // _id: new ObjectId('6568051335cb1609ceb947d7'),
        // name: 'テストユーザー',
        // email: 'atom@example..',
        // password: 'aaa...',
        // __v: 0
        // }

        if(savedUserData){
            //ユーザーデータが存在する場合
            if(req.body.password === savedUserData.password){
                // JWTのペイロードにemailアドレスを指定．
                const payload = {
                    email: req.body.email
                }
                // JWTトークンを発行jwt.sign()しtokenに格納．
                const token = jwt.sign(payload, secret_key, {expiresIn: '23h'})
                //console.log(token)
                return res.status(200).json({message: "ログイン成功", token: token})
                // {
                // "message": "ログイン成功",
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0b21AeWFoLmJ6IiwiaWF0IjoxNzAwOTg4NTQ0LCJleHAiOjE3MDEwNzEzNDR9.EKosKQ6gwuSG1YFO2yNC3dI-83FLRBdbTKcy_ybYAE8"
                // }
                // というJSONが画面に表示される．

            }else{
                //パスワードが間違っている場合
                return res.status(400).json({message: "ログイン失敗、パスワードが違います"})
            }
        }else{
            //ユーザーデータが存在しない場合
            return res.status(400).json({message: "ログイン失敗。ユーザー登録されていません"})
        }
    }catch(err){
        res.status(500).json({ error: 'ログイン失敗' });
    }
}

export default loginUser