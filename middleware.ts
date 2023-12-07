{/* ！このmiddleware.tsはルートに配置しなければならない（src配下だと動作しなかった）
    ！このmiddlewareを対象のapi処理の前に挟むには、対象api（例：api/create.ts）でインポートし
    ！export default middleware(createItem)、とmiddlewareで囲ってあげる必要がある．*/}

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"

//型定義
interface ResMessageType {
  message: string,
}

interface DecodedType {
  email: string,
}

const secret_key = "myportfolio"

const middleware = (handler: Function) => {
  return async(req:NextApiRequest, res:NextApiResponse<ResMessageType>) => {
    if(req.method === 'GET') { // 追加,修正,削除はすべてPOSTで行うのでGETの場合はここで処理をスルーする．
      console.log('GETはスルー')
      return handler(req, res)
    }

    const token = await (req.headers.authorization ?? '').split(" ")[1]
    // req.headers.authorizationの中身は「Bearer eyJhbGciOiJI....」となるため半角スペースでsplitした後半を取り出している．
    // pages/api/create/page.tsx70行目参考
    
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0b21AeWFoLmJ6IiwiaWF0IjoxNzAxMzE1ODkyLCJleHAiOjE3MDEzOTg2OTJ9.a46czI1AT5Tffr2SsytjmaAu7EWwaAKB4qXuKiHQk94"

    if(!token){
      return res.status(401).json({message: 'トークンがありません' })
    }

    try{
      const decoded = jwt.verify(token, secret_key)
        // console.log('▲', token) // eyJhbGciOiJIUzI1NiIsInR....が表示
        // console.log('■ デコードされたtoken:', decoded) //  {email: 'atom@example..', iat: 1701152943, exp: 1701235743}と表示
        req.body.email = (decoded as DecodedType).email // req.body.emailにdecoded.emalが格納されupdate/[id].ts等にreqとして渡される
        return handler(req,res)
      }catch(err){
        console.error('Token verification failed:', err);
        return res.status(400).json({message:'トークンが正しくないのでログインしてください'})
      } 
  }
}

export default middleware

////////////////// Basic認証 //////////////////
// export const middleware = (req: NextRequest) => {
//   const basicAuth = req.headers.get('authorization')
//   //HeaderにAuthorizationが定義されているかをチェック
//   console.log(basicAuth) // basic認証しないとnullとログ表示．
//                         // 認証するとBasic YXRvbUB5YWguYno6YWhvbTE0Njc=と表示．

//   if (basicAuth) {
//     const auth = basicAuth.split(' ')[1] // authにはYXRvbUB5YWguYno6YWhvbTE0Njc=が格納．
//     const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':') // authをbase64デコード
//     console.log('■'); console.log(user); console.log(pwd) // ■ atom@example.com a**m1***と表示

//     // basic認証のUser/Passが、envファイルにある値と同じかをチェック
//     if (user ===  process.env.NEXT_PUBLIC_USER && pwd === process.env.NEXT_PUBLIC_PASS) {
//       return NextResponse.next()
//     }
//   }

//   // 同じでなければエラーを返す
//   return new Response('Auth required', {
//     status: 401,
//     headers: {
//       'WWW-Authenticate': 'Basic realm="Secure Area"',
//     },
//   })
// }
////////////////// Basic認証ここまで //////////////////

export const config = {
  matcher: [  // matcherとはmiddlewareによる認証チェックを行うページ／API
    //pageのURL//
    // "/item/create",
    //apiのURL//
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
}