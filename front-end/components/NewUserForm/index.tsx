import { FC } from "react";
import { Formik } from "formik";
import { db } from "../../config";

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

const NewUserForm: FC<Props> = ({ onSuccess }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Formik
        initialValues={{ email: "", firstName: "", lastName: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
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
              <div>
                <label>Email</label>
              </div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <FormFieldError id="email" {...{ errors, touched }} />
            </div>
            <div>
              <div>
                <label>First Name</label>
              </div>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <FormFieldError id="firstName" {...{ errors, touched }} />
            </div>
            <div>
              <div>
                <label>Last Name</label>
              </div>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <FormFieldError id="lastName" {...{ errors, touched }} />
            </div>
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
