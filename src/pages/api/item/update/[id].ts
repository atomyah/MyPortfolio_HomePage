// pages/api/item/update/[id].ts
{/* middleware.tsをインポートしexport default middleware(updateItem)
とmiddlewareでコンポーネントをラップする必要がある．*/}

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { ItemModel, ItemDataType } from "@/utils/schemaModels";
import { Types } from 'mongoose'
import middleware from "../../../../../middleware";

// 型定義
interface ExtendedSavedItemDataType extends ItemDataType {
    _id: Types.ObjectId
}

interface ExtendedNextApiRequestItem extends NextApiRequest {
    body: ItemDataType
}

interface ResMessageType {
    message?: string,
    error?: string,
}


const updateItem = async(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
    console.log(req)
        // body: {
        //     title: 'ユーザー判定テスト',
        //     image: 'ユーザー判定テスト',
        //     description: 'ユーザー判定テスト',
        //     email: 'atom@example...' ← emailだけmiddleware.tsから渡されたreq.body.email(decoded.email)になっている．
        //   },

    try {
        await connectDB()
        console.log('▼', req.query.id) // req.query.idでURLのスラグ(＝itemのid)が取得できる．

        // singleItemが存在しない(null)の場合があるため、以下の2行のnull対策コードが必要.
        // (存在すれば)まず該当のアイテムデータをfindById()で取得しsingleItemに格納．
        const singleItem: ExtendedSavedItemDataType | null = await ItemModel.findById(req.query.id)
        if(!singleItem) return res.status(400).json({message: "アイテムが存在せず編集失敗"})

        console.log('■', singleItem.email)
        console.log('■', req.body.email)
        if(singleItem.email === req.body.email) { // 該当アイテムのemailとreq.body.emailを比較．
            await ItemModel.updateOne({_id: req.query.id}, req.body)
            // findById()は_idを使う前提.updateOne()はそうでないため
            // {_id: ...}と指定してあげる必要がある.さらに編集内容の入ったreq.bodyを引数に渡す．                            
            return res.status(200).json({message: "アイテム編集成功",})
        }else{
            throw new Error
        }
    }catch(err){
        return res.status(400).json({
            error: "アイテム編集失敗"
        })
    }
}

export default middleware(updateItem)