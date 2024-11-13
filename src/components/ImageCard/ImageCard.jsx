import s from "./ImageCard.module.css";
const ImageCard = ({ image, handleModal }) => {
  return (
    <div>
      <img
        className={s.img}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => handleModal(image)}
      />
    </div>
  );
};
export default ImageCard;
