import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link href="/" className={styles.links}>
            トップ
          </Link>
        </li>
        <li>
          <Link href="/contact" className={styles.links}>
            お問い合わせ
          </Link>
        </li>
        <li>
          <Link href="/hobby" className={styles.links}>
            趣味
          </Link>
        </li>
      </ul>
      <p className={styles.copyright}>@2024 Atom Yah</p>
    </footer>
  );
};

export default Footer;
