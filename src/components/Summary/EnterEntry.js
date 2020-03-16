import React from "react";

import { useMutate } from "restful-react";
import { useField, useForm } from "react-form";
import { isDevEnv } from "../../helpers/Utils";

function AmountField() {
  const {
    getInputProps,
  } = useField("amount");

  return (
    <span>
      <input {...getInputProps()} placeholder={"$"}/>
    </span>
  );
}

function CategoryField() {
  const {
    getInputProps,
  } = useField("category");

  return (
    <span>
      <input {...getInputProps()} placeholder={"food?"}/>
    </span>
  );
}

function CompanyField() {
  const {
    getInputProps,
  } = useField("company");

  return (
    <span>
      <input {...getInputProps()} placeholder={"apple?"}/>
    </span>
  );
}

function NoteField() {
  const {
    getInputProps,
  } = useField("note");

  return (
    <span>
      <input {...getInputProps()} placeholder={"about?"}/>
    </span>
  );
}

async function onSubmitForm(values, executePost) {
  // This way we assign default value to each key
  let obj = {
    amount: -1,
    category: "Undefined",
    company: "Undefined",
    note: "",
    ...values,
  };

  let data = await executePost(obj);

  // Simulate networking time
  if (isDevEnv()) {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // do something with data
  console.log(data);
}

function EnterEntry() {
  // Loading is true if executePost is running
  const { mutate: executePost, loading } = useMutate({
    verb: "POST",
    path: `/bill/`,
  });

  const {
    Form,
    meta: { isSubmitting },
  } = useForm({
    onSubmit: (values) => onSubmitForm(values, executePost),
    debugForm: true,
  });

  return (
    <div>
      <Form>
        <div>
          <label>
            Amount: <AmountField/>
          </label>
        </div>

        <div>
          <label>
            Category: <CategoryField/>
          </label>
        </div>

        <div>
          <label>
            Company: <CompanyField/>
          </label>
        </div>

        <div>
          <label>
            Note: <NoteField/>
          </label>
        </div>

        <div>
          <button type="submit">
            Submit
          </button>
        </div>

        <div>
          <div>{isSubmitting ? "Submitting..." : null}</div>
        </div>
      </Form>
    </div>
  );
}

export default EnterEntry;
