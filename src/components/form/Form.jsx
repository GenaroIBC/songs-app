import React from "react";
import { FaSearch } from "react-icons/fa";
export function Form({ handleSubmit, inputName }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputName}>{inputName}</label>
      <input type="text" name={inputName} />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
