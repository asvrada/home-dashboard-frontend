import React from "react";

import { useMutate } from "restful-react";

function EnterEntry() {
  // Loading is true if executePost is running
  const { mutate: executePost } = useMutate({
    verb: "POST",
    path: `/bill/`,
  });

  return (
    <div className={"EnterEntry"}>
      <div>To add a form</div>
    </div>
  );
}

export default EnterEntry;
