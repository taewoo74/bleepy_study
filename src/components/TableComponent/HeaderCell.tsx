import { colunmsType } from '../../views/home/homeComponent/HomeTable.tsx';
import classNames from 'classnames';
import { useState, MouseEvent } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
interface HeaderCellType {
  val: colunmsType;
  onClickSort: (changeSort: string) => void;
  sort: string;
  order: string;
  onMouseDownDrag: (e: MouseEvent, dragId: string) => void;
  widthData: number;
}

const HeaderCell = ({
  val,
  onClickSort,
  sort,
  order,
  onMouseDownDrag,
  widthData,
}: HeaderCellType) => {
  const [iconState, setIconState] = useState(false);

  return (
    <div
      style={{ width: widthData }}
      className={classNames(
        'text-center flex-row  justify-center items-center relative items-center truncate',
      )}
      onMouseOver={() => setIconState(true)}
      onMouseLeave={() => setIconState(false)}
    >
      <div className="inline-flex ">{val.name}</div>
      <AiOutlineArrowUp
        onClick={() => onClickSort(val.datakey)}
        className={classNames('inline-flex ml-[2px] cursor-pointer', {
          ' scale': order !== 'desc' && sort === val.datakey,
        })}
        size="18"
        // 현재 sort 값이 해당 headerCell 인경우와 order 값이 없을때 black  아닐시 안보임 마우스 오버시 회색
        color={
          order !== '' && sort === val.datakey
            ? 'black'
            : iconState
            ? '#aaa'
            : 'white'
        }
      />
      <div
        className="borderleft"
        onMouseDown={(e) => onMouseDownDrag(e, val.datakey)}
      ></div>
    </div>
  );
};

export default HeaderCell;
