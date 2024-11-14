import s from "./Loader.module.css";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={s.loader}>
      <RingLoader color="#FFFF00" size={60} />
    </div>
  );
};

export default Loader;
