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

interface ResReadAllType {
    message: string,
    allItems?:  ExtendedSavedItemDataType[],
}

const getAllItems = async(req: NextApiRequest, res: NextApiResponse<ResReadAllType>) => {
    try {
        await connectDB()
        const allItems: ExtendedSavedItemDataType[] = await ItemModel.find()
        return res.status(200).json({
            message: "アイテム全件読み取り成功",
            allItems: allItems,
        })
    }catch(err){
        return res.status(400).json({
            message: "アイテム全件読み取り失敗"
        })
    }
}

export default getAllItems