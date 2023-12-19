// src/app/components/AdminHeader.tsx
// 追加・編集・削除ページにのみ表示する上部ナビゲーションメニュー

import React from "react";
import styles from "./AdminHeader.module.css";
import Link from "next/link";

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <ul>
        <li>
            【管理用メニュー】
        </li>
        <li>
          <Link href="/user/register" className={styles.links}>
            ユーザー登録
          </Link>
        </li>
        <li>
          <Link href="/user/login" className={styles.links}>
            ユーザーログイン
          </Link>
        </li>
        <li>
          <Link href="/item/create" className={styles.links}>
            アイテム追加
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
