import React from "react";
import { Redirect } from "react-router-dom";
import { ErrorMessage, Field, Formik } from 'formik';

import { client, CREATE_TRANSACTION, GET_ENUMS, UPDATE_TRANSACTION } from "../../helpers/graphql";
// eslint-disable-next-line no-unused-vars
import { getBill_bill } from "../../helpers/types/getBill";
// eslint-disable-next-line no-unused-vars
import { getEnums_enums_edges_node } from "../../helpers/types/getEnums";
// eslint-disable-next-line no-unused-vars
import { EnumEnumCategory } from "../../types/graphql-global-types";
import { booleanToInt, getCurrentISOString, packSummaryFlag, unpackSummaryFlag } from "../../helpers/utils";

const getIDorNull = (obj: any) => {
  if (obj === undefined || obj === null) {
    return null;
  }
  return obj.id;
};

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

class BillForm extends React.Component<Props> {
  formValue: FormValue = {
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
  isCreate = true;

  state: {
    enums: {
      category: getEnums_enums_edges_node[],
      company: getEnums_enums_edges_node[],
      card: getEnums_enums_edges_node[]
    },
    redirectURL?: string,
    idToUpdate?: string
  } = {
    enums: {
      category: [],
      company: [],
      card: []
    }
  };

  constructor(props: Props) {
    super(props);

    this.isCreate = props.transaction === undefined;

    // Is a update form
    if (!this.isCreate) {
      const payload = props.transaction!;

      // store id of object to update
      this.state.idToUpdate = payload.id;

      // convert type Payload to Input
      this.formValue = {
        amount: payload.amount,
        category: getIDorNull(payload.category),
        company: getIDorNull(payload.company),
        card: getIDorNull(payload.card),
        note: payload.note === undefined ? '' : (payload.note || ''),
        timeCreated: payload.timeCreated,
        ...unpackSummaryFlag(payload.skipSummaryFlag)
      };
    }
  }

  prepareValueBeforeSubmit(values: FormValue) {

    const skipSummaryFlag: number = packSummaryFlag(values.isSkipBudget, values.isSkipTotal);

    let input: Payload = {
      id: this.state.idToUpdate,
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

  handleSubmit(value: FormValue) {
    const payload: Payload = this.prepareValueBeforeSubmit(value);

    console.log("Query", payload);

    const mutation = this.isCreate ? CREATE_TRANSACTION : UPDATE_TRANSACTION;

    return client.mutate({
      mutation: mutation,
      variables: {
        input: payload
      }
    });
  }

  componentDidMount(): void {
    // Query all the enums
    client.query({
      query: GET_ENUMS
    }).then(({data}) => {
      let listCategory: getEnums_enums_edges_node[] = [];
      let listCompany: getEnums_enums_edges_node[] = [];
      let listCard: getEnums_enums_edges_node[] = [];

      data.enums.edges.map((node: any) => {
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

      this.setState({
        enums: {
          category: listCategory,
          company: listCompany,
          card: listCard
        }
      });
    });
  }

  render() {
    if (this.state.redirectURL) {
      return <Redirect to={this.state.redirectURL} />;
    }

    const optionsCategory = [<option key="default" value={"null"}>-------</option>]
      .concat(this.state.enums.category.map((obj) =>
        <option key={obj.id} value={obj.id}>{obj.name}</option>
      ));

    const optionsCompany = [<option key="default" value={"null"}>-------</option>]
      .concat(this.state.enums.company.map((obj) =>
        <option key={obj.id} value={obj.id}>{obj.name}</option>
      ));

    const optionsCard = [<option key="default" value={"null"}>-------</option>]
      .concat(this.state.enums.card.map((obj) =>
        <option key={obj.id} value={obj.id}>{obj.name}</option>
      ));

    // @ts-ignore
    return (
      <div>
        <Formik
          initialValues={this.formValue}
          onSubmit={(values: FormValue, {setSubmitting}) => {
            this.handleSubmit(values).then(res => {
              console.log("Response", res);

              let id: string;
              if (this.isCreate) {
                id = res.data.createTransaction.transaction.id;
              } else {
                id = res.data.updateTransaction.transaction.id;
              }

              setSubmitting(false);

              this.setState({redirectURL: `/detail/${id}/`});
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
}

export default BillForm;