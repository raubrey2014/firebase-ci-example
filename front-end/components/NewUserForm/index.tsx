import { FC } from "react";
import { Formik } from "formik";
import { db } from "../../config";

function isValidEmail(email: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

interface Props {
  onSuccess: Function;
}

const userCollection = db.collection("users");

const FormFieldError = ({ errors, touched, id }) => {
  const show = errors[id] && touched[id];
  return (
    <div style={{ height: "1rem", overflow: "hidden" }}>
      <p
        style={{
          fontSize: 10,
          color: "red",
          opacity: show ? 1 : 0,
        }}
      >
        {errors[id]}
      </p>
    </div>
  );
};

const FormField = ({
  type,
  name,
  label,
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
}) => {
  return (
    <>
      <div>
        <label>{label}</label>
      </div>
      <input
        {...{ type, name }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
      />

      <FormFieldError id={name} {...{ errors, touched }} />
    </>
  );
};

const NewUserForm: FC<Props> = ({ onSuccess }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Formik
        initialValues={{ email: "", firstName: "", lastName: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!isValidEmail(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.firstName) errors.firstName = "First name is required";
          if (!values.lastName) errors.lastName = "Last name is required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          userCollection.add({ ...values });
          setTimeout(() => {
            onSuccess();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <h4>{isSubmitting ? "Submitting..." : "Enter your info!"}</h4>
            </div>
            <FormField
              name="email"
              type="email"
              label="Email"
              {...{ errors, values, touched, handleBlur, handleChange }}
            />
            <FormField
              name="firstName"
              type="text"
              label="First Name"
              {...{ errors, values, touched, handleBlur, handleChange }}
            />
            <FormField
              name="lastName"
              type="text"
              label="Last Name"
              {...{ errors, values, touched, handleBlur, handleChange }}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewUserForm;
