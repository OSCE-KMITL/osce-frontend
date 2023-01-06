import React from "react";
import styles from "../../../styles/navigation_bar/NavigationBar.module.scss";
import Link from "next/link";

const NavigationBar: React.FC = () => {
  return (
    <div>
      <div className={styles.container}>
        <Link href={"/"} className={styles.logo}>
          ระบบสหกิจออนไลน์
        </Link>
        <div className={styles.link}>
          <Link href={"/"}>หน้าแรก</Link>
          <Link href={"/accounts"}>user list</Link>
          <p>ประชาสัมพันธ์</p>
          <Link href={"/login"} className={styles.action}>
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
