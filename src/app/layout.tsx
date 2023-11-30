import type { Metadata } from "next";
import Footer from "./Footer";
import "./globals.css";
import styles from "./layout.module.css";
import { Noto_Sans_JP } from "next/font/google";
//          ↑
// Next/FontのLayout.tsxへ割り当て参考：https://zenn.dev/tsuyoshi/articles/894592ac677148
//        ↓
const NotoSansJP = Noto_Sans_JP({
  weight: "400", // あなたが必要とするウェイトを指定します
  subsets: ["latin"], // 必要なサブセットを指定します
  display: "auto", // フォントの表示方法を指定します
});

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
      <body className={NotoSansJP.className}>
        <main className={styles.container}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
