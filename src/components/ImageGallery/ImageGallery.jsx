import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ data, handleModal }) => {
  return (
    <ul className={s.gallery}>
      {data.map((image) => (
        <li className={s.card} key={image.id}>
          <ImageCard image={image} handleModal={handleModal} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
