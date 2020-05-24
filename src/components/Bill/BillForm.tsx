import React from "react";
import { ErrorMessage, Field, Formik } from 'formik';

import { DEFAULT_TRANSACTION, ITransaction } from "../../helpers/graphql";

type Props = {
  transaction?: ITransaction
}

class BillForm extends React.Component<Props> {
  transaction: ITransaction = DEFAULT_TRANSACTION;
  isCreate = true;

  constructor(props: Props) {
    super(props);

    this.isCreate = props.transaction === undefined;

    if (props.transaction) {
      this.transaction = props.transaction;
    }
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={this.transaction}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              console.log(values);
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

              <label>Amount</label>
              <Field type="number" name="amount" />
              <ErrorMessage name="amount" component="div" />
              <br />

              <label>Note</label>
              <Field type="text" name="note" />
              <ErrorMessage name="note" component="div" />
              <br />

              <label className="cursor-pointer" htmlFor="idSkipSummary">Skip Summary</label>
              <Field id="idSkipSummary" name="skipSummary" component="input" type="checkbox"
                     checked={values.skipSummary} />
              <br />

              <label>Time Created</label>
              <Field type="text" name="timeCreated" />
              <br />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>

            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default BillForm;