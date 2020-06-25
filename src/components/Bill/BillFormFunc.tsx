import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { ErrorMessage, Field, Formik } from "formik";

import { getBill_bill } from "../../helpers/types/getBill";
import { getCurrentISOString, packSummaryFlag, unpackSummaryFlag } from "../../helpers/utils";
import { CREATE_TRANSACTION, GET_ENUMS, UPDATE_TRANSACTION } from "../../helpers/graphql";
import { getEnums_enums_edges_node } from "../../helpers/types/getEnums";
import { EnumEnumCategory } from "../../types/graphql-global-types";


interface Props {
  transaction?: getBill_bill
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
  category: string | null,
  company: string | null,
  card: string | null,
  note: string,
  isSkipBudget: boolean,
  isSkipTotal: boolean,
  timeCreated: string,
}

interface State {
  idToUpdate?: string,
  isCreate: boolean,
  redirectURL: string
}

const getIDorNull = (obj: any) => {
  if (obj === undefined || obj === null) {
    return null;
  }
  return obj.id;
};

function prepareValueBeforeSubmit(values: FormValue, state: State) {

  const skipSummaryFlag: number = packSummaryFlag(values.isSkipBudget, values.isSkipTotal);

  let input: Payload = {
    id: state.isCreate ? undefined : state.idToUpdate,
    amount: values.amount,
    category: values.category,
    company: values.company,
    card: values.card,
    note: values.note,
    skipSummaryFlag: skipSummaryFlag,
    timeCreated: values.timeCreated
  };

  if (input.category === 'null' || input.category === null) {
    input.category = undefined;
  }
  if (input.company === 'null' || input.company === null) {
    input.company = undefined;
  }
  if (input.card === 'null' || input.card === null) {
    input.card = undefined;
  }

  return input;
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

function generateInitialFormValue({transaction}: Props) {
  let initialFormValue: FormValue = {
    amount: 0,
    note: '',

    category: null,
    company: null,
    card: null,

    isSkipBudget: false,
    isSkipTotal: false,

    // todo: creator
    timeCreated: getCurrentISOString()
  };

  if (transaction !== undefined) {
    initialFormValue = {
      amount: transaction.amount,
      note: transaction.note === undefined ? '' : (transaction.note || ''),

      category: getIDorNull(transaction.category),
      company: getIDorNull(transaction.company),
      card: getIDorNull(transaction.card),

      ...unpackSummaryFlag(transaction.skipSummaryFlag),

      timeCreated: transaction.timeCreated
    }
  }

  return initialFormValue;
}

function BillFormFunc({transaction}: Props) {
  const client = useApolloClient();
  const [state, setState]: [State, any] = useState({
    idToUpdate: transaction?.id,
    isCreate: transaction === undefined,
    redirectURL: ""
  });
  const {loading, error, data} = useQuery(GET_ENUMS);

  if (state.redirectURL) {
    return <Redirect to={state.redirectURL} />;
  }

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

  const optionsCategory = [<option key="default" value={"null"}>-------</option>]
    .concat(listCategory.map((obj) =>
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));

  const optionsCompany = [<option key="default" value={"null"}>-------</option>]
    .concat(listCompany.map((obj) =>
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));

  const optionsCard = [<option key="default" value={"null"}>-------</option>]
    .concat(listCard.map((obj) =>
      <option key={obj.id} value={obj.id}>{obj.name}</option>
    ));

  return (
    <div>
      <Formik
        initialValues={generateInitialFormValue({transaction})}
        onSubmit={(values: FormValue, {setSubmitting}) => {
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

            setState({
              ...state,
              redirectURL: `/detail/${id}/`
            });
          });
        }}
      >
        {({
            values,
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

            <label>Category</label>
            <Field component="select" name="category">
              {optionsCategory}
            </Field>
            <br />

            <label>Company</label>
            <Field component="select" name="company">
              {optionsCompany}
            </Field>
            <br />

            <label>Card</label>
            <Field component="select" name="card">
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

export default BillFormFunc;