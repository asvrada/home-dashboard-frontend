import { useApolloClient, useQuery } from "@apollo/react-hooks";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { CREATE_TRANSACTION, GET_ENUMS, UPDATE_TRANSACTION } from "../../helpers/graphql";
import { getBill_bill } from "../../helpers/types/getBill";
import { getEnums_enums_edges_node } from "../../helpers/types/getEnums";
import { packSummaryFlag, shouldBeUndefined, unpackSummaryFlag } from "../../helpers/utils";
import { EnumEnumCategory } from "../../types/graphql-global-types";

interface Props {
  transaction?: getBill_bill,
  urlToGoBack: string
}

// Type of object sent to GraphQL
interface Payload {
  id?: string,
  amount: number;
  category?: string | null,
  company?: string | null,
  card?: string | null,
  note?: string | null,
  skipSummaryFlag?: number | null,
  timeCreated?: string | null,
}

interface FormValue {
  amount: number;
  note: string,
  category: string | null,
  company: string | null,
  card: string | null,
  isSkipBudget: boolean,
  isSkipTotal: boolean,
  timeCreated: Date,
}

interface State {
  idToUpdate?: string,
  isCreate: boolean
}

function getIDorNull(obj: any): string | null {
  return obj?.id ?? null;
}

function generateEnumList({enums}: any) {
  let listCategory: getEnums_enums_edges_node[] = [];
  let listCompany: getEnums_enums_edges_node[] = [];
  let listCard: getEnums_enums_edges_node[] = [];

  enums.edges.map((node: any) => {
    const obj: getEnums_enums_edges_node = node.node;
    switch (obj.category) {
      case EnumEnumCategory.Card:
        listCard.push(obj);
        break;
      case EnumEnumCategory.Category:
        listCategory.push(obj);
        break;
      case EnumEnumCategory.Company:
        listCompany.push(obj);
        break;
      default:
        throw Error("Wrong obj category");
    }

    return undefined;
  });

  const cmp = (a: getEnums_enums_edges_node, b: getEnums_enums_edges_node) => a.name < b.name ? -1 : 1;
  listCategory.sort(cmp);
  listCompany.sort(cmp);
  listCard.sort(cmp);

  return [listCategory, listCompany, listCard];
}

function generateInitialFormValue(transaction?: getBill_bill): FormValue {
  let initialFormValue: FormValue = {
    amount: 0,
    note: '',

    category: null,
    company: null,
    card: null,

    isSkipBudget: false,
    isSkipTotal: false,

    // todo: creator

    timeCreated: new Date() // getCurrentISOString()
  };

  if (transaction) {
    initialFormValue = {
      amount: transaction.amount,
      note: transaction?.note ?? '',

      category: getIDorNull(transaction.category),
      company: getIDorNull(transaction.company),
      card: getIDorNull(transaction.card),

      ...unpackSummaryFlag(transaction.skipSummaryFlag),

      timeCreated: new Date(transaction.timeCreated)
    }
  }

  return initialFormValue;
}

function prepareValueBeforeSubmit(values: FormValue, state: State): Payload {
  const skipSummaryFlag: number = packSummaryFlag(values.isSkipBudget, values.isSkipTotal);

  let payload: Payload = {
    id: state.isCreate ? undefined : state.idToUpdate,
    amount: Math.round(values.amount * 100) / 100,
    category: values.category,
    company: values.company,
    card: values.card,
    note: values.note,
    skipSummaryFlag: skipSummaryFlag,
    // todo: convert to string
    timeCreated: values.timeCreated.toISOString()
  };

  if (shouldBeUndefined(payload.category)) {
    payload.category = undefined;
  }
  if (shouldBeUndefined(payload.company)) {
    payload.company = undefined;
  }
  if (shouldBeUndefined(payload.card)) {
    payload.card = undefined;
  }

  return payload;
}

function BillForm({transaction, urlToGoBack}: Props) {
  const history = useHistory();
  const client = useApolloClient();
  const {loading, error, data} = useQuery(GET_ENUMS);

  const state: State = {
    idToUpdate: transaction?.id,
    isCreate: transaction === undefined
  };

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>Error!</div>
    );
  }

  const [listCategory, listCompany, listCard] = generateEnumList(data);

  const optionsCategory = [<option key="option-none-category" value="" label="---" />]
    .concat(listCategory.map((obj) =>
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));

  const optionsCompany = [<option key="option-none-company" value="" label="---" />]
    .concat(listCompany.map((obj) =>
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));

  const optionsCard = [<option key="option-none-card" value="" label="---" />]
    .concat(listCard.map((obj) =>
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={generateInitialFormValue(transaction)}
        onSubmit={(values: FormValue, {setSubmitting, setErrors}) => {
          const payload: Payload = prepareValueBeforeSubmit(values, state);
          const mutation = state.isCreate ? CREATE_TRANSACTION : UPDATE_TRANSACTION;

          console.log("Mutate", payload);
          client.mutate({
            mutation: mutation,
            variables: {
              input: payload
            }
          }).then((res: any) => {
            console.log("Response", res);

            let id: string;
            if (state.isCreate) {
              id = res.data.createTransaction.transaction.id;
            } else {
              id = res.data.updateTransaction.transaction.id;
            }

            setSubmitting(false);

            // Redirect
            history.replace(`/detail/${id}/`);
          }).catch(err => {
            let errAmount = err.graphQLErrors.map((errObj: any) => errObj.message);

            setErrors({amount: errAmount.join(". ")});

            setSubmitting(false);
          });
        }}
        onReset={() => {
          // Exit editing page
          history.push(urlToGoBack);
        }}
      >
        {({
            values,
            handleSubmit,
            handleReset,
            setFieldValue,
            isSubmitting,
          }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>

            <label>Amount</label>
            <Field type="number" name="amount" />
            <ErrorMessage name="amount" component="div" />
            <br />

            <label>Category</label>
            <Field component="select" name="category" value={values.category ?? ""}>
              {optionsCategory}
            </Field>
            <br />

            <label>Company</label>
            <Field component="select" name="company" value={values.company ?? ""}>
              {optionsCompany}
            </Field>
            <br />

            <label>Card</label>
            <Field component="select" name="card" value={values.card ?? ""}>
              {optionsCard}
            </Field>
            <br />

            <label>Note</label>
            <Field type="text" name="note" />
            <ErrorMessage name="note" component="div" />
            <br />

            <label className="cursor-pointer" htmlFor="idSkipBudget">Don&lsquo;t count in Budget</label>
            <Field id="idSkipBudget" name="isSkipBudget" component="input" type="checkbox"
                   checked={(values as { isSkipBudget: boolean }).isSkipBudget} />
            <br />

            <label className="cursor-pointer" htmlFor="idSkipTotal">Don&lsquo;t count in Total</label>
            <Field id="idSkipTotal" name="isSkipTotal" component="input" type="checkbox"
                   checked={(values as { isSkipTotal: boolean }).isSkipTotal} />
            <br />

            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={values.timeCreated}
              onChange={(newDate) => {
                // Skip Invalid Date
                if (!newDate || (newDate instanceof Date && isNaN(newDate.getTime()))) {
                  return;
                }

                const oldDate = values.timeCreated;
                // copy time from timeCreated to newDate
                newDate.setHours(oldDate.getHours(), oldDate.getMinutes());

                setFieldValue('timeCreated', newDate);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <br />

            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              value={values.timeCreated}
              onChange={(newDate) => {
                // Skip Invalid Date
                if (!newDate || (newDate instanceof Date && isNaN(newDate.getTime()))) {
                  return;
                }

                const oldDate = values.timeCreated;
                // copy date from timeCreated to newDate
                newDate.setFullYear(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate());

                setFieldValue('timeCreated', newDate);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />

            <br />

            <Button type="button" variant='secondary' className="m-1" onClick={() => {
              setFieldValue('timeCreated', new Date());
            }}>
              Set Date and Time to Now
            </Button>

            <br />

            <Button type="submit" className="m-1" disabled={isSubmitting}>
              Submit
            </Button>

            <Button type="reset" className="m-1">
              Cancel
            </Button>

          </form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}

export default BillForm;