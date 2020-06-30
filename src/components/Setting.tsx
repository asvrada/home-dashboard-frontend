import { ErrorMessage, Field, Formik } from "formik";
import React, { useContext } from "react";
import { useGet, useMutate } from "restful-react";
import WrapperContainer from "./Layout/WrapperContainer";
import { IUserContext, UserContext } from "./User/UserContext";

interface FormValue {
  amount: number
}

function UpdateBudgetForm({budget, setBudget}: any) {
  return (
    <Formik
      initialValues={{amount: budget}}
      onSubmit={(values: FormValue, {setSubmitting}) => {
        setSubmitting(false);
        setBudget(values.amount);
      }}
    >
      {({
          // values,
          // errors,
          // touched,
          // handleChange,
          // handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit}>

          <label>Amount</label>
          <Field type="number" name="amount" />
          <ErrorMessage name="amount" component="div" />
          <br />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>

        </form>
      )}
    </Formik>
  );
}

function Setting() {
  const userContext = useContext(UserContext) as IUserContext;

  // GET
  const {data: objBudget, loading: loadingGet} = useGet({
    path: "/restful/budget/",
    requestOptions: {headers: {Authorization: `Bearer ${userContext.accessToken}`}},
  });

  // PUT
  const {mutate: updateBudget} = useMutate({
    verb: "PUT",
    path: `/restful/budget/`,
    requestOptions: {headers: {Authorization: `Bearer ${userContext.accessToken}`}},
  });

  if (loadingGet) {
    return (
      <WrapperContainer>
        <div>Loading...</div>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer>
      <h1>Setting</h1>
      <UpdateBudgetForm budget={objBudget.amount}
                        setBudget={(amount: number) => updateBudget({amount}).then(() => alert("Succeed!"))} />
    </WrapperContainer>
  );
}

export default Setting;
