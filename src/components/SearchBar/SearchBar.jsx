import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ handleQuery }) => {
  const createQuery = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim().toLowerCase();
    if (newQuery === "") return toast.error("Search cannot be empty");
    e.target.reset();
    return handleQuery(newQuery);
  };

  return (
    <header className={s.header}>
      <form onSubmit={createQuery} className={s.form}>
        <input
          className={s.inputText}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">
          <MdSearch className={s.btn} />
        </button>
      </form>
      <Toaster position="top-left" reverseOrder={false} />
    </header>
  );
};

export default SearchBar;
