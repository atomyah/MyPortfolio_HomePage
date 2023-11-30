// next/font/googleの使用
// 参考：https://zenn.dev/siino/articles/b42d658af571f0
// https://github.com/snd-primary/nextfonts/tree/main/app

import { M_PLUS_Rounded_1c, Zen_Kaku_Gothic_Antique, Source_Code_Pro } from 'next/font/google'

export const mPlusRounded1c = M_PLUS_Rounded_1c({
    weight: "700", // あなたが必要とするウェイトを指定します
    subsets: ["latin"], // 必要なサブセットを指定します
    display: "auto", // フォントの表示方法を指定します
});
export const ZenKakuGothicNew = Zen_Kaku_Gothic_Antique({
    display: 'swap',
    weight: ['700'],
    preload: false,
})
  export const SourceCodePro = Source_Code_Pro({
    subsets:['latin'],
    display: 'swap',
    weight: ['700'],
})