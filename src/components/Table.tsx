import React from "react";

interface TableProps {
  columns: string[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function Table({ columns, data, onRowClick }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left font-medium text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="px-6 py-4 text-gray-700">
                  {value as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="p-6 text-center text-gray-500">No data available</div>
      )}
    </div>
  );
}
