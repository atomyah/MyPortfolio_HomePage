// src/utils/database.ts
// MongoDBを使用するにあたって、次の二つをインストール．
// npm install mongodb@4.1 mongoose


import mongoose from 'mongoose'

const connectDB = async() => {
    // MongoDBのダッシュボードでDBやコレクションを作成する必要なし．
    // 下記connect()命令でpfDataBaseを自動作成し.schemaModels.tsの
    // ItemModel = mongoose.models.Itemで自動で'items'コレクションを作成する．
    try {
        const connectKey = process.env.MONGODB_CONNECT_KEY;
        if (!connectKey) { // TypeScriptなのでnull対応のため必要な記述．
            throw new Error("MongoDBへの接続詞（MONGODB_CONNECT_KEY）がない");
        }
        
        await mongoose.connect(connectKey)
        // console.log('■', '接続成功')
    }catch(err){
        // console.log('■', '接続失敗')
        throw new Error()
    }
}

export default connectDB