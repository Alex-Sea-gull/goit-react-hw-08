import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import s from "./RegistrationForm.module.css";
import { Link } from "react-router-dom";
import { registerThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const orderSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Must be filled"),
    password: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Password is required"),
  });

  const handleRegister = (values, options) => {
    console.log(values);
    dispatch(registerThunk(values));
    options.resetForm();
  };

  return (
    <div className={s.wrapperLoginForm}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={orderSchema}
        onSubmit={handleRegister}
      >
        <Form>
          <label className={s.label}>
            <span className={s.span}>Name</span>
            <Field name="name" className={s.input} />
          </label>
          <label className={s.label}>
            <span className={s.span}>Email</span>
            <Field name="email" className={s.input} />
          </label>
          <label className={s.label}>
            <span className={s.span}>Password</span>
            <Field name="password" type="password" className={s.input} />
          </label>
          <button type="submit" className={s.button}>
            Register
          </button>
          <p className={s.goToLogin}>
            You already have account?{" "}
            <Link to="/login" className={s.goToLoginLink}>
              {" "}
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
