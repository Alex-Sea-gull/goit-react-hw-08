import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import s from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
      .min(3, "Minimum 7 characters")
      .max(50, "Maximum 50 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, options) => {
    console.log(values);
    options.resetForm();
  };

  return (
    <div className={s.wrapperLoginForm}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={orderSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label className={s.label}>
            <span className={s.span}>Email</span>
            <Field name="email" className={s.input} />
          </label>
          <label className={s.label}>
            <span className={s.span}>Password</span>
            <Field name="password" type="password" className={s.input} />
          </label>
          <button type="submit" className={s.button}>
            Log in
          </button>
          <p className={s.goToLogin}>
            You do not have account?{" "}
            <Link to="/register" className={s.goToLoginLink}>
              {" "}
              Lets create one!
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
