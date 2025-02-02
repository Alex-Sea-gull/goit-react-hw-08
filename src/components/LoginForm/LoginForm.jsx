import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import s from "./LoginForm.module.css";

const orderSchema = Yup.object({
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

const LoginForm = () => {
  const initialValues = {
    password: "",
    email: "",
  };
  const handleSubmit = (values, options) => {
    console.log(values);
    options.resetForm();
  };

  return (
    <div className={s.wrapperLoginForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={orderSchema}
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
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
