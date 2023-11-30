{/* ログインするのは自分だけなのでmiddlewareでBasic認証で済ました．
register.tsもlogin.tsも（およびそれらを発火するフロントエンドのページも必要なくなった。
まだ追加すべきことはJWTの仕組みをmiddleware.tsに取り入れることができるかどうか。*/}


// pages/api/user/register.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { UserModel, UserDataType } from "@/utils/schemaModels";

// 型定義
interface ResMessageType {
    message?: string,
    error?: string,
}

interface ExtendedNextApiRequestUser extends NextApiRequest {
    body: UserDataType
}

const registerUser = async(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
    try {
        await connectDB()
        console.log(req.body)
        await UserModel.create(req.body)
        res.status(200).json({ message: "ユーザー登録成功" });
    }catch(err){
        res.status(500).json({ error: 'ユーザー登録失敗' });
    }
}

export default registerUser