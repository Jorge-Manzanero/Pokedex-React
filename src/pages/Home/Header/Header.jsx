import React from "react";
import css from "./header.module.scss";
import logo from "../../../assets/logo.png";
import * as Faicons from "react-icons/fa";

export default function Header({ getSearch }) {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo Pokemon" />
        </div>
        <div className={css.div_search}>
          <div>
            <Faicons.FaSearch />
          </div>
          <input
            type="search"
            onChange={(e) => getSearch(e.target.value)}
          ></input>
        </div>
      </div>
    </nav>
  );
}
