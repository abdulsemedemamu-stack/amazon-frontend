import React from "react";
import numeral from "numeral";

function CurrencyFormat({ amount }) {
  const formattedAmount = numeral(amount || 0).format("$0,0.00");

  return <div>{formattedAmount}</div>;
}

export default CurrencyFormat;
