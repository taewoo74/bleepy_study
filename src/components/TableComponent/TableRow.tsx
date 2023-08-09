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
  widthData: any;
}

const TableRow = ({
  row,
  checkedItems,
  checkedItemHandler,
  clickRow,
  colunms,
  widthData,
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
            style={{ width: widthData[val.datakey] }}
            className={classNames(
              'text-center text-xs leading-9 truncate',
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
