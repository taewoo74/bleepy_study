import classNames from 'classnames';
import {
  colunmsType,
  rowDataType,
} from '../../views/home/homeComponent/HomeTable.tsx';
import { ChangeEvent, MouseEvent } from 'react';

interface TableRowType {
  row: rowDataType;
  checkedItems: Set<number | unknown>;
  checkedItemHandler: (
    id: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  clickRow: (e: MouseEvent<HTMLDivElement>, val: rowDataType) => void;
  colunms: colunmsType[];
}

const TableRow = ({
  row,
  checkedItems,
  checkedItemHandler,
  clickRow,
  colunms,
}: TableRowType) => {
  return (
    <div className="flex w-f border-b border-gray-400 h-[36px] leading-9 font-semibold">
      <input
        type="checkBox"
        checked={checkedItems.has(row.id)}
        onChange={(e) => checkedItemHandler(row.id, e)}
      />
      <div
        className="table_header flex flex-nowrap justify-between"
        onClick={(e) => clickRow(e, row)}
      >
        {colunms.map((val) => (
          <div
            className={classNames(
              'text-center text-xs flex-1 leading-9',
              row.tableCustom(val.datakey),
            )}
            key={val.id}
          >
            {row[val.datakey]}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TableRow;
