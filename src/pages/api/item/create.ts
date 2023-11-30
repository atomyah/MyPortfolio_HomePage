// pages/api/item/create.ts
{/* middleware.tsをインポートしexport default middleware(createItem)
とmiddlewareでコンポーネントを囲ってあげる必要がある．*/}

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel, ItemDataType } from "@/utils/schemaModels";
import middleware from "../../../../middleware";

// 型定義
interface ResMessageType {
    message?: string,
    error?: string,
}

interface ExtendedNextApiRequestItem extends NextApiRequest {
    body: ItemDataType
}

const createItem = async(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {

    try {
        await connectDB()
        console.log(req.body)
        await ItemModel.create(req.body)
        res.status(200).json({ message: "アイテム作成成功" });
    }catch(err){
        res.status(500).json({ error: 'サーバーエラー' });
    }
}

export default middleware(createItem)


