import React from "react";
import { getToken } from "../modules/authManager";

export default function Hello() {
  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>hello</span>
  );
}