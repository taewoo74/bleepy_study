import {
  colunmsType,
  rowDataType,
} from '../views/home/homeComponent/HomeTable.tsx';

interface TableDataType {
  colunms: colunmsType[];
  rowData: rowDataType[];
}

const TableComponent = ({ colunms, rowData }: TableDataType) => {
  return (
    <div className="flex w-f mt-10  flex-col">
      <div className="flex w-f border-y border-gray-400 h-[36px] leading-9 font-semibold">
        <div className="flex w-[30px] ml-4">
          <input type="checkBox" />
        </div>
        <div className="table_header flex flex-nowrap justify-around">
          {colunms.map((val) => (
            <div className="flex" key={val.id}>
              {val.name}
            </div>
          ))}
        </div>
      </div>
      {rowData.map((row) => (
        <div className="flex w-f border-b border-gray-400 h-[36px] leading-9 font-semibold ">
          <input type="checkBox" />

          <div className="flex basis-auto ">
            {colunms.map((val) => (
              <div className="text-center w-[190px] text-xs" key={val.id}>
                {row[val.key]}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableComponent;
