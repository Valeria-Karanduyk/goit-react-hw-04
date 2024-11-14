import fetchImg from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";

function App() {
  const queryObj = {
    topic: "",
    per_page: 10,
    page: 1,
  };
  const [query, setQuery] = useState(queryObj);
  const [totalPage, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!query.topic) return;
    const handleForm = async () => {
      try {
        setLoader(true);
        const data = await fetchImg(query.topic, query.per_page, query.page);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    handleForm();
  }, [query]);
  return (
    <>
      <SearchBar setQuery={setQuery} query={query} />
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
