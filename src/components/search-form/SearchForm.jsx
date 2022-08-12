import { FaSearch } from "react-icons/fa";
import { v4 as uuid } from "uuid";
export function SearchForm({ handleSubmit, inputsConfig }) {
  return (
    <form
      className="text-white text-center d-flex flex-column"
      onSubmit={handleSubmit}
    >
      {inputsConfig.map(({ name, label, required }) => (
        <>
          <label key={uuid()} className="fs-3" htmlFor={name}>
            {label}
          </label>
          <input
            required={required}
            key={uuid()}
            minLength={3}
            placeholder={label.toLowerCase()}
            className="my-2 mb-4"
            type="text"
            name={name}
          />
        </>
      ))}
      <button
        key={uuid()}
        className="bg-info text-white border-0 rounded p-2"
        type="submit"
      >
        <FaSearch />
      </button>
    </form>
  );
}
