import s from "./ErrorMessage.module.css";

const ErrorMessage = ({ code, message }) => {
  return (
    <div className={s.error}>
      <h2>{code}</h2>
      <p>{message}</p>
    </div>
  );
};
export default ErrorMessage;
