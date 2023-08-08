import classNames from 'classnames';
import {
  colunmsType,
  rowDataType,
  pageDataType,
} from '../../views/home/homeComponent/HomeTable.tsx';
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import PageNation from './PageNation.tsx';
import SearchFilter from './SearchFilter.tsx';
import HeaderCell from './HeaderCell.tsx';
import TableRow from './TableRow.tsx';

interface TableDataType {
  colunms: colunmsType[];
  rowData: rowDataType[];
  pageData: pageDataType;
  onChangePage: (num: number) => void;
}

const TableComponent = ({
  colunms,
  rowData,
  pageData,
  onChangePage,
}: TableDataType) => {
  const [chartData, setChartData] = useState<rowDataType[]>([]);
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Set<number | unknown>>(
    new Set(),
  );
  const [checkBoxAll, setCheckBoxAll] = useState<boolean>(false);
  const [partCheck, setPartCheck] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  // 검색했을때 검색어 저장,검색데이터 필터
  const onChagneSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result: rowDataType[] = [];
    chartData.forEach((one: rowDataType) => {
      one.filter = searchFilterObj(one, search);
      result.push(one);
    });
    setChartData(result);
    setSearch(search);
  };

  //filter 구분함수로 사용 obj 와 value를 넣어서 obj에 해당값이 들어있다면 true 리턴
  const searchFilterObj = (obj: rowDataType, value: string) => {
    return Object.values(obj).find((val) => {
      if (typeof val !== 'string') {
        return false;
      }
      val = val.trim().toLocaleLowerCase();
      value = value.trim().toLocaleLowerCase();
      return val.includes(value);
    });
  };

  //체크박스 ALL체크 함수
  const clickCheckedAll = () => {
    let result = new Set();
    if (checkBoxAll == false) {
      chartData.forEach((one: rowDataType) => {
        result.add(one.id);
      });
      setCheckBoxAll(true);
    } else {
      setCheckBoxAll(false);
    }
    setCheckedItems(result);
    setPartChecked(result);
  };

  // 체크박스 함수
  const checkedItemHandler = (
    id: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;
    let result = new Set([...checkedItems]);
    if (isChecked) {
      result.add(id);
      setCheckedItems(result);
    } else {
      result.delete(id);
      setCheckedItems(result);
    }
    setPartChecked(result);
  };

  // 부분 체크
  const setPartChecked = (checked: Set<number | unknown>) => {
    let partChecked = false;
    if (0 < checked.size && checked.size < chartData.length) {
      partChecked = true;
    }
    setPartCheck(partChecked);
  };

  /** header를 클릭했을때 호출되는 함수 sort order를 바꿔줌
   * changeSort: string 클릭된곳의 sort 값을 받음
   */
  const onClickSort = (changeSort: string) => {
    // 처음 눌렀을경우 , 다른거 눌렀을경우
    if (sort !== changeSort) {
      setSort(changeSort);
      setOrder('asc');
      changeTableData(changeSort, 'asc');
      return;
    }
    // 같은거 눌렀을 경우 2가지
    if (sort === changeSort && order === 'desc') {
      setSort('');
      setOrder('');
      setTableData();
    } else {
      setSort(changeSort);
      setOrder('desc');
      changeTableData(changeSort, 'desc');
    }
  };

  /** sort 했을때 데이터를 sort 시켜주는 함수
   * sort: string, order: string sort 와 order 값을 받음
   */

  const changeTableData = (sort: string, order: string) => {
    chartData.sort(function (a: rowDataType, b: rowDataType) {
      var nameA = a[sort];
      var nameB = b[sort];
      if (order === 'asc') {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      if (order === 'desc') {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
      }
      return 0;
    });
    setChartData(chartData);
  };

  // 테이블 데이터 셋팅
  const setTableData = () => {
    const reuslt: rowDataType[] = [];
    rowData.forEach((row) => {
      const one = deepCopy(row);
      reuslt.push(one);
    });
    setChartData(reuslt);
  };

  // object 안에 몇단이든 모두 복사해줌
  const deepCopy = (obj: rowDataType) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    let copy: any = {};
    for (let key in obj) {
      copy[key] = deepCopy(obj[key]);
    }
    return copy;
  };

  // row 클릭시 alert 뛰워줌
  const clickRow = (e: MouseEvent<HTMLDivElement>, val: rowDataType) => {
    e.stopPropagation();
    alert(JSON.stringify(val));
  };

  useEffect(() => {
    setTableData();
  }, [rowData]);

  //onMouseDown, onMouseMove, onMouseUp

  return (
    <div className="mt-10">
      <div className="flex justify-left">
        <SearchFilter search={search} onChagneSearch={onChagneSearch} />
      </div>
      <div className="flex w-f   flex-col h-[324px] overflow-y-scroll relative">
        <div className="flex w-f border-y border-gray-400 h-[36px] leading-9 font-semibold sticky top-[0] bg-white">
          <input
            type="checkbox"
            className={classNames({ partChecked: partCheck })}
            id="check_all"
            onChange={clickCheckedAll}
            checked={partCheck || checkBoxAll}
          />
          <label
            className={classNames({ partChecked: partCheck })}
            htmlFor="check_all"
          ></label>
          <div className="table_header flex flex-nowrap justify-between">
            {colunms.map((val) => (
              <>
                <HeaderCell
                  val={val}
                  onClickSort={onClickSort}
                  sort={sort}
                  order={order}
                />
              </>
            ))}
          </div>
        </div>
        {chartData.length > 0 ? (
          <>
            {chartData.map(
              (row: rowDataType) =>
                row.filter && (
                  <TableRow
                    row={row}
                    checkedItems={checkedItems}
                    checkedItemHandler={checkedItemHandler}
                    clickRow={clickRow}
                    colunms={colunms}
                  />
                ),
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-f">
            <div className="text-center">데이터가 존재하지 않습니다.</div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <PageNation pageData={pageData} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default TableComponent;
