import classNames from 'classnames';
import { pageDataType } from '../../views/home/homeComponent/HomeTable.tsx';
import { useState, useEffect } from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface PageNationType {
  pageData: pageDataType; // pageData 객체
  onChangePage: (num: number) => void; // page 바꿨을때 호출하는 함수
}

const PageNation = ({ pageData, onChangePage }: PageNationType) => {
  const [pageBox, setPageBox] = useState<number[]>([]);

  // 보여줄수있는 페이지값 계산해서 배열에 담아주는 함수
  const setPageData = () => {
    let firstPage = Math.floor(pageData.page / pageData.pageSize) * 10;
    if (pageData.page % pageData.pageSize === 0) firstPage = firstPage - 10;

    let maxPage = firstPage + 10;
    if (pageData.totalPages !== 0 && maxPage > pageData.totalPages) {
      maxPage = pageData.totalPages;
    }
    const pageArr = maxPage - firstPage;
    const arr = Array(pageArr)
      .fill(firstPage)
      .map((_v: number, i) => i + firstPage + 1);
    setPageBox(arr);
  };

  const onClickfirstPage = () => {
    if (pageData.page === 1) {
      return;
    }
    onChangePage(1);
  };

  const onClickPrevPage = () => {
    if (pageData.page === 1) {
      return;
    }
    onChangePage(pageData.page - 1);
  };

  const onClickNextPage = () => {
    if (pageData.page === pageData.totalPages) {
      return;
    }
    onChangePage(pageData.page + 1);
  };

  const onClickLastPage = () => {
    if (pageData.page === pageData.totalPages) {
      return;
    }
    onChangePage(pageData.totalPages);
  };

  const fPage = pageData.page === 1 ? false : true;

  let lPage = false;
  if (pageData.page === pageData.totalPages) {
    lPage = true;
  }

  useEffect(() => {
    setPageData();
  }, [pageData]);

  return (
    <div className="flex">
      <MdKeyboardDoubleArrowLeft
        className="mt-[5px] mr-[5px]"
        onClick={onClickfirstPage}
        color={fPage ? '#aaa' : '#000'}
      />
      <MdKeyboardArrowLeft
        className="mt-[5px] mr-[5px]"
        onClick={onClickPrevPage}
        color={fPage ? '#aaa' : '#000'}
      />

      {pageBox.map((val) => (
        <div
          className={classNames(
            'w-[20px] h-[20px] cursor-pointer text-center leading-5 mt-1',
            { selectedPage: pageData.page === val },
          )}
          key={val}
          onClick={() => onChangePage(val)}
        >
          {val}
        </div>
      ))}
      <MdKeyboardArrowRight
        className="mt-[5px] ml-[5px]"
        onClick={onClickNextPage}
        color={lPage ? '#aaa' : '#000'}
      />
      <MdKeyboardDoubleArrowRight
        onClick={onClickLastPage}
        className="mt-[5px] ml-[5px]"
        color={lPage ? '#aaa' : '#000'}
      />
    </div>
  );
};

export default PageNation;
