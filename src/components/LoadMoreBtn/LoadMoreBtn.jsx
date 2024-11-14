import s from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ setQuery, totalPage, page }) => {
  const handleNewPage = () => {
    setQuery((prev) => ({ ...prev, page: (prev.page += 1) }));
  };

  return page < totalPage ? (
    <button className={s.btn} onClick={handleNewPage}>
      {" "}
      Load more{" "}
    </button>
  ) : (
    ""
  );
};
export default LoadMoreBtn;
