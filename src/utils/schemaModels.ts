{/* ログインするのは自分だけなのでmiddlewareでBasic認証で済ました．
register.tsもlogin.tsも（およびそれらを発火するフロントエンドのページも必要なくなった。
従って、UserDataType, UseSchema, UserModel = mongoose.models.Userも必要ない．
まだ追加すべきことはJWTの仕組みをmiddleware.tsに取り入れることができるかどうか。*/}


//utils/schemaModels.ts

import mongoose from "mongoose";

const Schema = mongoose.Schema


// 型定義 //
// アイテムの型定義
export type ItemDataType = {
    title: string,
    image: string,
    description: string,
    email?: string
}

// ユーザーの型定義
export type UserDataType = {
    name: string,
    email: string,
    password: string,
}


// MongoDB用のスキーマ定義 //
// アイテムのスキーマ定義
const ItemSchema = new Schema<ItemDataType>({
    title: String,
    image: String,
    description: String,
    email: String,
})

// ユーザーのスキーマ定義
const UserSchema = new Schema<UserDataType>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export const ItemModel = mongoose.models.Item || mongoose.model<ItemDataType>('Item', ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model<UserDataType>("User", UserSchema)