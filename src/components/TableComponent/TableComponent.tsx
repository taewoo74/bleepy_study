import classNames from 'classnames';
import {
  colunmsType,
  rowDataType,
  pageDataType,
} from '../../views/home/homeComponent/HomeTable.tsx';
import { useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';
import PageNation from './PageNation.tsx';
import SearchFilter from './SearchFilter.tsx';

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
  const [chartData, setChartData] = useState<any>([]);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [checkBoxAll, setCheckBoxAll] = useState(false);
  const [partCheck, setPartCheck] = useState(false);

  const clickCheckedAll = () => {
    let result = new Set();
    if (checkBoxAll == false) {
      chartData.forEach((one: any) => {
        result.add(one.id);
      });
      setCheckBoxAll(true);
    } else {
      setCheckBoxAll(false);
    }
    setCheckedItems(result);
    setPartChecked(result);
  };

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

  /** header를 클릭했을때 호출되는 함수 sort order를 바꿔줌
   * changeSort: string 클릭된곳의 sort 값을 받음
   */
  const onClickSort = (changeSort: string) => {
    if (sort !== changeSort) {
      setSort(changeSort);
      setOrder('asc');
      changeTableData(changeSort, 'asc');
      return;
    }
    if (sort === changeSort && order === 'desc') {
      setSort('');
      setOrder('');
      let result = [...rowData];
      setChartData(result);
    } else {
      let resultOrder = '';
      if (order === '') {
        resultOrder = 'desc';
      }
      if (order === 'asc') {
        resultOrder = 'desc';
      }
      setSort(changeSort);
      setOrder(resultOrder);
      changeTableData(changeSort, resultOrder);
    }
  };

  /** sort 했을때 데이터를 sort 시켜주는 함수
   * sort: string, order: string sort 와 order 값을 받음
   */

  const changeTableData = (sort: string, order: string) => {
    let result = [...chartData];
    result.sort(function (a: any, b: any) {
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
    setChartData(result);
  };

  const setTableData = () => {
    let result = [...rowData];
    setChartData(result);
  };

  const setPartChecked = (checked: any) => {
    let partChecked = false;
    if (0 < checked.size && checked.size < chartData.length) {
      partChecked = true;
    }
    setPartCheck(partChecked);
  };

  const clickRow = (val: any) => {
    alert(JSON.stringify(val));
  };

  useEffect(() => {
    setTableData();
  }, [rowData]);

  return (
    <div className="mt-10">
      <div className="flex justify-left">
        <SearchFilter />
      </div>
      <div className="flex w-f   flex-col h-[313px] overflow-scroll relative">
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
              <div
                className="text-center flex-1 flex-row"
                key={val.id}
                onClick={() => onClickSort(val.datakey)}
              >
                <div>
                  {val.name}
                  {sort === val.datakey && order == 'desc' && (
                    <AiOutlineArrowDown
                      className="inline-flex ml-4"
                      size="18"
                    />
                  )}
                  {sort === val.datakey && order == 'asc' && (
                    <AiOutlineArrowUp className="inline-flex ml-4" size="18" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {chartData.length > 0 ? (
          <>
            {chartData.map((row: any) => (
              <div
                className="flex w-f border-b border-gray-400 h-[36px] leading-9 font-semibold"
                key={row.id}
                onClick={() => clickRow(row)}
              >
                <input
                  type="checkBox"
                  checked={checkedItems.has(row.id)}
                  onChange={(e) => checkedItemHandler(row.id, e)}
                />
                <div className="table_header flex flex-nowrap justify-between">
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
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center h-f">
            <div className="text-center">데이터가 존재하지 않습니다.</div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <PageNation pageData={pageData} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default TableComponent;
