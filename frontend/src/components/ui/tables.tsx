"use client";
import React, { useEffect } from "react";

type Props = {
  classNameT?: string;
  header?: string[];
  data?: any[];
  classNameH: string;
  classNameB: string;
  classNameButton?: string;
  classNameButtonCancel?: string;
  classNameIcons?: string;
  onEstadoClick?: (estado: string, row: any) => void;
  onDeleteClick?: (estado: string, row: any) => void;
  onDeleteCompany?: (row: any) => void;
  onUpdateCompany?: (row: any) => void;
  onCancelState?: (row: any) => void;
  onMapClick?: (row: any) => void;
};

export default function Tables({
  classNameT,
  classNameH,
  classNameB,
  header,
  data,
  classNameButton,
  classNameButtonCancel,
  classNameIcons,
  onEstadoClick,
  onDeleteClick,
  onDeleteCompany,
  onCancelState,
  onMapClick,
  onUpdateCompany
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
            {header?.map((key, index) => (
              <>
                {key.toLowerCase() == "estado" ? (
                  <td className={classNameB} key={index}>
                    <button
                      className={classNameButton}
                      onClick={() =>
                        onEstadoClick?.(row[key.toLowerCase()], row)
                      }
                    >
                      {row[key.toLowerCase()]}
                    </button>
                  </td>
                ) : key.toLowerCase() == "acciones" ? (
                  <td className={classNameB} key={index}>
                    {row[key.toLowerCase()] === "Cancelar"
                      ? (<button
                        className={classNameButtonCancel}
                        onClick={() => onCancelState?.(row)}
                      >
                        {row[key.toLowerCase()]}
                      </button>) : row[key.toLowerCase()] === "-" ?
                        row[key.toLowerCase()] :

                        <i
                          className={`${row[key.toLowerCase()]} ${classNameIcons}`}
                          onClick={() =>
                            row[key.toLowerCase()] === "bx bx-map"
                              ? onMapClick?.(row)
                              : onDeleteClick?.(row.estado, row)
                          }
                        ></i>
                    }
                  </td>
                ) : key.toLowerCase() == "eliminar" ? (
                  <td className={classNameB} key={index}>
                    <i
                      className={`${row[key.toLowerCase()]} ${classNameIcons}`}
                      onClick={() =>
                        onDeleteCompany?.(row)
                      }
                    ></i>
                  </td>
                ) : key.toLowerCase() == "editar" ? (
                  <td className={classNameB} key={index}>
                    <i
                      className={`${row[key.toLowerCase()]} ${classNameIcons}`}
                      onClick={() =>
                        onUpdateCompany?.(row)
                      }
                    ></i>
                  </td>
                ) : (
                  <td className={classNameB} key={index}>
                    {row[key.toLowerCase()]}
                  </td>
                )}
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
