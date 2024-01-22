// src/utils/useAuth.ts 
// 各フロントページ（create, update, delete）への制限をかける．
// !! jsonwebtokenを9.0.1から8.5.1にダウングレードしないとjwt.verifyできない．!!
// npm install jsonwebtoken@8.5.1 @types/jsonwebtoken@8.5.1

"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import jwt from "jsonwebtoken"

const secret_key = "myportfolio"

// 型定義
interface DecodedType {
    email: string,
}

const useAuth = () => {
    const [loginUser, setLoginUser] = useState<string>("")
    const router = useRouter()

    // 追加や編集・削除ページへのアクセスの前にこのuseAuth.tsのチェックが必要．
    // ページが表示される前にこの処理を行うためuseEffect()を使用する．
    useEffect(() => {
        const token = localStorage.getItem("token")
        
        if(!token){
            router.push("/user/login") 
        }
    
        try{
            const decoded = jwt.verify(token as string, secret_key)
            setLoginUser((decoded as DecodedType).email)
        }catch(error){
            alert('権限がありません。おそらくトークンの失効です。ログインして下さい')
            router.push("/user/login")
        }
    }, [router])

    //console.log('●loginUserは', loginUser)
    return loginUser; // ログインユーザーのemailが格納されたloginUserを他のファイルで使用できるようにするためreturnしている．
}

export default useAuth