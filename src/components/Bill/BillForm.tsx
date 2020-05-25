import React from "react";
import { ErrorMessage, Field, Formik } from 'formik';

import { client, CREATE_TRANSACTION, GET_ENUMS, UPDATE_TRANSACTION } from "../../helpers/graphql";
// eslint-disable-next-line no-unused-vars
import { getBill_bill } from "../../helpers/types/getBill";
// eslint-disable-next-line no-unused-vars
import { getEnums_enums_edges_node } from "../../helpers/types/getEnums";
// eslint-disable-next-line no-unused-vars
import { CreateTransactionInput, EnumEnumCategory, UpdateTransactionInput } from "../../types/graphql-global-types";
import { getCurrentISOString } from "../../helpers/utils";

type Props = {
  transaction?: getBill_bill
}

class BillForm extends React.Component<Props> {
  transaction: CreateTransactionInput | UpdateTransactionInput | {} = {};
  isCreate = true;

  state: {
    enums: {
      category: getEnums_enums_edges_node[],
      company: getEnums_enums_edges_node[],
      card: getEnums_enums_edges_node[]
    }
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

    const getIDorNull = (obj: any) => {
      if (obj === undefined || obj === null) {
        return null;
      }
      return obj.id;
    };

    if (this.isCreate) {
      this.transaction = {
        amount: 0,
        category: null,
        company: null,
        card: null,
        note: "",
        skipSummary: false,
        timeCreated: getCurrentISOString()
      }
    } else {
      const payload = props.transaction!;
      // convert type Payload to Input
      this.transaction = {
        id: payload.id,
        amount: payload.amount,
        category: getIDorNull(payload.category),
        company: getIDorNull(payload.company),
        card: getIDorNull(payload.card),
        note: payload.note,
        skipSummary: payload.skipSummary,
        timeCreated: payload.timeCreated
      };
    }
  }

  prepareValueBeforeSubmit(transaction: any) {
    if (transaction.category === 'null') {
      transaction.category = null;
    }
    if (transaction.company === 'null') {
      transaction.company = null;
    }
    if (transaction.card === 'null') {
      transaction.card = null;
    }

    return transaction;
  }

  handleSubmit(value: any) {
    const transaction = this.prepareValueBeforeSubmit(value);

    console.log(transaction);

    const mutation = this.isCreate ? CREATE_TRANSACTION : UPDATE_TRANSACTION;

    client.mutate({
      mutation: mutation,
      variables: {
        input: transaction
      }
    }).then((res) => console.log(res));
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
          initialValues={this.transaction}
          onSubmit={(values, {setSubmitting}) => {
            this.handleSubmit(values);
            setSubmitting(false);
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
              /* and other goodies */
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

              <label className="cursor-pointer" htmlFor="idSkipSummary">Skip Summary</label>
              <Field id="idSkipSummary" name="skipSummary" component="input" type="checkbox"
                     checked={(values as {skipSummary: boolean}).skipSummary} />
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