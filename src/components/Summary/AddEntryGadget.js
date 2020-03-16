import React, {useState} from "react";

import {isDevEnv} from "../../helpers/Utils";
import EnterEntry from "./EnterEntry";

/**
 * Display a button which allows user to add a new entry to money log book
 */
function AddEntryGadget() {
  const [showEnterEntry, setShowEnterEntry] = useState(isDevEnv());

  let componentEnterEntry = null;
  if (showEnterEntry) {
    componentEnterEntry = <EnterEntry/>;
  }

  return (
    <div className="AddEntryGadget">
      <div>
        <button onClick={() => setShowEnterEntry(!showEnterEntry)}>
          Add entry
        </button>
      </div>

      <div>
        {componentEnterEntry}
      </div>
    </div>
  );
}

export default AddEntryGadget;
