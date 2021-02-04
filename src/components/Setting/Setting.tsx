import { ErrorMessage, Field, Formik } from 'formik';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useGet, useMutate } from 'restful-react';
import { IUserContext, UserContext } from '../User/UserContext';

interface FormValue {
  amount: number
}

function UpdateBudgetForm({initialBudget, putBudget}: any) {
  return (
    <Formik
      initialValues={{amount: initialBudget}}
      onSubmit={(values: FormValue, {setSubmitting, setErrors, setValues}) => {

        const cleanBudget = Math.round(values.amount);
        setValues({amount: cleanBudget});

        putBudget({amount: cleanBudget})
          .then((res: any) => {
            if (res.status && res.status !== 200) {
              throw res;
            }

            console.log('Dashboard - UpdateBudgetForm - putBudget HTTP 200', res);
            alert('OK');
          })
          .catch((err: any) => {
            console.log('Dashboard - UpdateBudgetForm - error', err);

            if (err.status === 400) {
              setErrors({amount: err.data.error.amount.join('. ')});
            }
          });

        setSubmitting(false);
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

          <div className="form-group">
            <label>Amount</label>
            <Field type="number" name="amount" />
            <ErrorMessage name="amount" component="div" />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>

        </form>
      )}
    </Formik>
  );
}

function Setting(): any {
  const userContext = useContext(UserContext) as IUserContext;

  // GET
  const {data: objBudget, loading: loadingGet} = useGet({
    path: '/restful/budget/',
    requestOptions: {headers: {Authorization: `Bearer ${userContext.accessToken}`}},
  });

  // PUT
  const {mutate: putBudget} = useMutate({
    verb: 'PUT',
    path: `/restful/budget/`,
    requestOptions: {headers: {Authorization: `Bearer ${userContext.accessToken}`}},
  });

  if (loadingGet) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <h1>Setting</h1>
      <UpdateBudgetForm initialBudget={objBudget.amount}
                        putBudget={putBudget} />
    </>
  );
}

export default Setting;
