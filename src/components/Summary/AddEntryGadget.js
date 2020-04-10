import React, {useState} from "react";

import {isDevEnv} from "../../helpers/Utils";
import EnterEntry from "./EnterEntry";

/**
 * Display a button which allows user to add a new entry to money log book
 */
function AddEntryGadget() {
  return (
    <div className="AddEntryGadget">
      <div>
        <button>
          New
        </button>
      </div>
    </div>
  );
}

export default AddEntryGadget;
