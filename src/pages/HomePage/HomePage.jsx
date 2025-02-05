import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.welcome}>Welcome to Your Personal Contactbook!</h1>
    </div>
  );
};

export default HomePage;
