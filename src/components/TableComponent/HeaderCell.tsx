import { colunmsType } from '../../views/home/homeComponent/HomeTable.tsx';

import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';
interface HeaderCellType {
  val: colunmsType;
  onClickSort: (changeSort: string) => void;
  sort: string;
  order: string;
}

const HeaderCell = ({ val, onClickSort, sort, order }: HeaderCellType) => {
  return (
    <div
      className="text-center flex-1 flex-row flex justify-center items-center relative items-center"
      onClick={() => onClickSort(val.datakey)}
    >
      <div className="inline-flex">{val.name}</div>
      {sort === val.datakey && order == 'desc' && (
        <AiOutlineArrowDown className="inline-flex ml-[2px]" size="18" />
      )}
      {sort === val.datakey && order == 'asc' && (
        <AiOutlineArrowUp className="inline-flex ml-[2px]" size="18" />
      )}
      <div className="borderleft"></div>
    </div>
  );
};

export default HeaderCell;
