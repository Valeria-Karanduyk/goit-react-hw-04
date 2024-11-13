import s from "./Loader.module.css";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={s.loader}>
      <RingLoader color="#038c03" size={40} />
    </div>
  );
};

export default Loader;
