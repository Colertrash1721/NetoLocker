"use client";
import React, { useEffect } from "react";

type Props = {
  classNameT?: string;
  header?: string[];
  data?: any[];
  classNameH: string;
  classNameB: string;
  classNameButton?: string;
  classNameIcons?: string;
};

export default function Tables({
  classNameT,
  classNameH,
  classNameB,
  header,
  data,
  classNameButton,
  classNameIcons
}: Props) {
  // This component renders a table with headers and data.

  useEffect(() => {
    // This effect runs once when the component mounts.
    // You can add any initialization logic here if needed.
    console.log(
      "Table component mounted with headers:",
      header,
      "and data:",
      data
    );

    header?.map((item, i) => {
      console.log(`Header ${i + 1}: ${item}`);
      data?.map((row, j) => {
        console.log(`Row ${j + 1}:`, row);
        console.log(`Value for ${item} in row ${j + 1}:`, row[item]);
      });
    });
  }, []);

  return (
    <table className={`${classNameT}`}>
      <thead className="rounded-lg">
        <tr>
          {header?.map((item, index) => (
            <th key={index} className={classNameH}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, i) => (
          <tr key={i} className="border-b last:border-b-0 border-gray-200">
            {header?.map((key, index) =>
              <>
              {key.toLowerCase() == "estado" ? (
                <td className={classNameB} key={index}>
                  <button className={classNameButton}>{row[key.toLowerCase()]}</button>
                </td>
              ) : ( key.toLowerCase() == "acciones" ? (
                <td className={classNameB} key={index}>
                  <i className={`${row[key.toLowerCase()]} ${classNameIcons}`}></i>
                </td>
              ) :
                <td className={classNameB} key={index}>
                  {row[key.toLowerCase()]}
                </td>
              )}
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
