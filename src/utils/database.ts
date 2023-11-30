// utils/database.ts
// MongoDBを使用するにあたって、次の二つをインストールした．
// npm install mongodb@4.1
// npm install mongoose

// DB名としてappDataBaseを追加．

import mongoose from 'mongoose'

const connectDB = async() => {
    // MongoDBのダッシュボードでDBやコレクションを作成する必要なし．
    // 下記connect()命令でpfDataBaseを勝手に作成し.schemaModels.tsの
    // ItemModel = mongoose.models.Itemで勝手に'items'コレクションを作成する．
    try {
        const connectKey = process.env.MONGODB_CONNECT_KEY;
        if (!connectKey) { // TypeScriptなのでnull対応のため必要な記述．
            throw new Error("MongoDBへの接続詞（MONGODB_CONNECT_KEY）がない");
        }
        
        await mongoose.connect(connectKey)
        console.log('■', '接続成功')
    }catch(err){
        console.log('■', '接続失敗')
        throw new Error()
    }
}

export default connectDB