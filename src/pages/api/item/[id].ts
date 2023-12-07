// pages/api/item/readall.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel, ItemDataType } from "@/utils/schemaModels";
import { Types } from 'mongoose'

// 型定義
interface ExtendedSavedItemDataType extends ItemDataType {
    _id: Types.ObjectId
}

interface ResReadSingleType {
    message: string,
    singleItem?: ExtendedSavedItemDataType,
}

const getSingleItem = async(req: NextApiRequest, res: NextApiResponse<ResReadSingleType>) => {
    try {
        await connectDB()
        console.log(req.query.id) // req.query.idでURLのスラグ(＝itemのid)が取得できる．

        // singleItemが存在しない(null)場合があるため、以下の2行のnull対策コードが必要
        const singleItem: ExtendedSavedItemDataType | null = await ItemModel.findById(req.query.id)
        if(!singleItem) return res.status(400).json({message: 'アイテム無し故に読み取り失敗'}) // このnull対応がないと26行目singleItemでエラー
        
        return res.status(200).json({message: "アイテム１件読み取り成功",singleItem: singleItem,})
    }catch(err){
        return res.status(400).json({
            message: "アイテム１件読み取り失敗"
        })
    }
}

export default getSingleItem