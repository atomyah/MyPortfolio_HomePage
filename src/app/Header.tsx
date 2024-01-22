// src/app/Header.tsx
// 主にトップナブメニューを表示するためのもの

import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
	return (
		<header className={styles.header}>
			<ul>
				<li>
					<Link href="/" className={styles.links}>
						トップ
					</Link>
				</li>
				<li>
					{/* <Link href="/contact" className={styles.links}> 
          シューマツワーカーの依頼でリンク切った. */}
					<Link href="/contact" className={styles.links}>
						お問い合わせ
					</Link>
				</li>
				<li>
					{/* <Link href="/hobby" className={styles.links}> 
          シューマツワーカーの依頼でリンク切った. */}
					<Link href="/hobby" className={styles.links}>
						趣味
					</Link>
				</li>
				<li>
					<Link href="/user/login" className={styles.links}>
						ログイン
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;
