import fetchImg from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState(false);
  const [totalPage, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    isActive: false,
    errCode: "",
    errMsg: "",
  });
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const handleQuery = (query, perPage) => {
    if (perPage !== "") setPerPage(perPage);
    setFirstLoad(true);
    setQuery(query);
    setPagination(false);
    setPage(1);
    return;
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setPagination(true);
    return;
  };

  const handleModal = (imageData) => {
    setSelectedImage(imageData);
    toggleIsOpen();
    return;
  };

  const toggleIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!query) return;
    (async () => {
      try {
        setLoader(true);
        setError({ isActive: false, errCode: "", errMsg: "" });
        setTotalPages(0);
        const data = await fetchImg(query, perPage, page);
        if (pagination) {
          setResults((prev) => [...prev, ...data.results]);
          setTotalPages(data.total_pages);
          return;
        }
        setTotalPages(data.total_pages);
        setResults(data.results);
      } catch (err) {
        setError({
          isActive: true,
          errCode: err.status,
          errMsg: err?.response.data.errors.join(", "),
        });
      } finally {
        setLoader(false);
        setFirstLoad(false);
      }
    })();
  }, [query, page, pagination, perPage]);

  return (
    <>
      <SearchBar handleQuery={handleQuery} query={query} id="gallery" />
      {firstLoad ? (
        ""
      ) : results.length > 0 ? (
        <ImageGallery data={results} handleModal={handleModal} />
      ) : (
        <h2>Images not found...</h2>
      )}
      {error.isActive && (
        <ErrorMessage code={error.errCode} message={error.errMsg} />
      )}
      {loader && <Loader />}
      {page < totalPage && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      <ImageModal
        isOpen={isModalOpen}
        onClose={toggleIsOpen}
        selectedImage={selectedImage}
      />
    </>
  );
};

export default App;
