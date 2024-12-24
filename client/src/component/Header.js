import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <nav className={styles.header}>
      <h1 className={styles.title}> <Link to="/" className={styles.list_style}>GraphQL-Project</Link></h1>
      <ul className={styles.list_menu}>
        <Link to="/" className={styles.list_style}><li>Authors</li></Link>
        <Link to="/game" className={styles.list_style}><li>Game</li></Link>
        <Link to="/review" className={styles.list_style}><li>Reviews</li></Link>
      </ul>
    </nav>
  );
}

export default Header;
