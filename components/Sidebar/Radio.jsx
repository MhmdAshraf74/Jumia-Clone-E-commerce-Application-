import React from "react";
import styles from "../../styles/radioColor.module.css";

export default function Radio({ name, id, value, text, onClick }) {
  return (
    <li>
      <label htmlFor={id} className="flex justify-start items-center p-2">
        <input
          className="mx-2 text-amber-500  border-amber-300 focus:text-amber-500  focus:ring-amber-500 "
          type="radio"
          name={name}
          id={id}
          value={value}
          onClick={onClick}
        />
        <span>{text}</span>
      </label>
    </li>
  );
}
