import React from "react";

import WrapperContainer from "../Layout/WrapperContainer";
import SiteHeader from "../SiteHeader";

type Props = {
  children: any
}

function WrapperForm({children}: Props) {
  return (
    <>
      <SiteHeader />
      <WrapperContainer>
        {children}
      </WrapperContainer>
    </>
  );
}

export default WrapperForm;