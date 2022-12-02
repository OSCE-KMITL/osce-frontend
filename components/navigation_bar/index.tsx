import React from "react";
import styles from "../../styles/navigation_bar/NavigationBar.module.scss";
import { Noto_Sans_Thai } from "@next/font/google";

const noto = Noto_Sans_Thai({
  subsets: ["thai"],
});

const NavigationBar: React.FC = () => {
  return (
    <div className={noto.className}>
      <div className={styles.container}>
        <div className={styles.logo}>ระบบสหกิจออนไลน์</div>
        <div className={styles.link}>
          <p>หน้าแรก</p>
          <p>ประกาศรับสมัครงาน</p>
          <p>กำหนดการสหกิจ</p>
          <p>ดาวโหลดแบบฟอร์ม</p>
          <p className={styles.action}>เข้าสู่ระบบ</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;