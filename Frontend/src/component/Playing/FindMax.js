import React, { useState, useEffect } from "react";
import Playing from "./Playing";
import axios from "axios";

export default function FindMax() {
  const [checkMax, setCheckMax] = useState(0);
  let findXMAX = " ";
  useEffect(() => {
    getAllCard().then((res) => {
      if (res.status == "200") {
        console.log("[ Get card server : 200 OK ! ]");
        let arr = res.data;
        var maxValue = Math.max.apply(
          null,
          arr.map(function (o) {
            return o._id;
          })
        );
        console.log(maxValue);
        setCheckMax(maxValue);

        // var lowest = Number.POSITIVE_INFINITY;
        // var highest = Number.NEGATIVE_INFINITY;
        // var tmp;
        // for (var i = res.data.length - 1; i >= 0; i--) {
        //   tmp = res.data[i]._id;
        //   if (tmp < lowest) lowest = tmp;
        //   if (tmp > highest) highest = tmp;
        // }
        // setCheckMax(highest);
        // console.log(checkMax);
        // findXMAX = <Playing maxID={checkMax} />;
      }
    });
  }, [0]);
  const getAllCard = async () => {
    return await axios.get("http://localhost:5000/card/");
  };

  if (checkMax != 0) {
    console.log("checkMax");
    let findXMAX = null;
    findXMAX = <Playing maxID={checkMax} />;
    return findXMAX;
  }

  return <div>{findXMAX} </div>;
}
