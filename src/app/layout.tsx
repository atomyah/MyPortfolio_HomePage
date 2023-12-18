import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./Footer";
import "./globals.css";
import styles from "./layout.module.css";
import Loading from "./loading";
import Script from 'next/script'
import { Noto_Sans_JP } from "next/font/google";
//          ↑
// Next/FontのLayout.tsxへ割り当て参考：https://zenn.dev/tsuyoshi/articles/894592ac677148
//        ↓
// const NotoSansJP = Noto_Sans_JP({
//   weight: "400", // あなたが必要とするウェイトを指定します
//   subsets: ["latin"], // 必要なサブセットを指定します
//   display: "auto", // フォントの表示方法を指定します
// });

export const metadata: Metadata = {
  title: "Atom Yahポートフォリオ",
  description: "Next.js14で作成したポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <main className={styles.container}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}