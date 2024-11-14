import fetchImg from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const queryObj = {
    topic: "",
    per_page: 10,
    page: 1,
  };
  const [query, setQuery] = useState(queryObj);
  const [totalPage, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    isActive: false,
    errCode: "",
    errMsg: "",
  });

  useEffect(() => {
    if (!query.topic) return;
    const handleForm = async () => {
      try {
        setError({ isActive: false, errCode: "", errMsg: "" });
        setLoader(true);
        const data = await fetchImg(query.topic, query.per_page, query.page);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError({
          isActive: true,
          errCode: err.status,
          errMsg: err.response.data.errors.join(", "),
        });
      } finally {
        setLoader(false);
      }
    };
    handleForm();
  }, [query]);
  return (
    <>
      <SearchBar setQuery={setQuery} query={query} />
      {error.isActive ? (
        <ErrorMessage code={error.errCode} message={error.errMsg} />
      ) : (
        ""
      )}
      <LoadMoreBtn
        setQuery={setQuery}
        totalPage={totalPage}
        page={query.page}
      />
      {loader ? <Loader /> : ""}
    </>
  );
}

export default App;
