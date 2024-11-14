import fetchImg from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const queryObj = {
    topic: "",
    per_page: 10,
    page: 1,
    pagination: false,
  };
  const [query, setQuery] = useState(queryObj);
  const [totalPage, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    isActive: false,
    errCode: "",
    errMsg: "",
  });
  const [results, setResults] = useState(["FIRST-LOAD"]);

  useEffect(() => {
    if (!query.topic) return;
    (async () => {
      try {
        if (!query.pagination) setResults(["FIRST-LOAD"]);
        setError({ isActive: false, errCode: "", errMsg: "" });
        setLoader(true);
        const data = await fetchImg(query.topic, query.per_page, query.page);
        if (query.pagination) {
          return setResults((prev) => [...prev, ...data.results]);
        }
        setTotalPages(data.total_pages);
        setResults(data.results);
      } catch (err) {
        setError({
          isActive: true,
          errCode: err.status,
          errMsg: err.response.data.errors.join(", "),
        });
      } finally {
        setLoader(false);
      }
    })();
  }, [query]);
  const [modal, setModal] = useState(false);
  const handleModal = (url, alt, description, likes) => {};
  return (
    <>
      <SearchBar setQuery={setQuery} query={query} id="gallery" />
      {results[0] === "FIRST-LOAD" ? (
        ""
      ) : results.length > 0 ? (
        <ImageGallery data={results} handleModal={handleModal} />
      ) : (
        <h2>Images not found...</h2>
      )}
      {error.isActive ? (
        <ErrorMessage code={error.errCode} message={error.errMsg} />
      ) : (
        ""
      )}
      {loader ? <Loader /> : ""}
      <LoadMoreBtn
        setQuery={setQuery}
        totalPage={totalPage}
        page={query.page}
      />
      <ImageModal handleModal={handleModal} />
    </>
  );
}

export default App;
