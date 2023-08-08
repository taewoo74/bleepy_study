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
  pageData: pageDataType;
  onChangePage: (num: number) => void;
}

const PageNation = ({ pageData, onChangePage }: PageNationType) => {
  const [firstPage, setFristPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);
  const [pageBox, setPageBox] = useState<number[]>([]);

  const setPageData = () => {
    const firstPage = Math.floor(pageData.page / pageData.pageSize) * 10 + 1;
    setFristPage(firstPage);

    let maxPage = firstPage + 10;
    if (maxPage > pageData.totalPages) {
      maxPage = pageData.totalPages;
    }
    setMaxPage(maxPage);

    const arr = Array(maxPage)
      .fill(1)
      .map((_v: number, i) => i + 1);
    setPageBox(arr);
  };

  const onClickfirstPage = () => {
    if (pageData.page == 1) {
      return;
    }
    onChangePage(1);
  };

  const onClickPrevPage = () => {
    if (pageData.page == 1) {
      return;
    }
    onChangePage(pageData.page - 1);
  };

  const onClickNextPage = () => {
    if (pageData.page == pageData.totalPages) {
      return;
    }
    onChangePage(pageData.page + 1);
  };

  const onClickLastPage = () => {
    if (pageData.page == pageData.totalPages) {
      return;
    }
    onChangePage(pageData.totalPages);
  };

  let fPage = false;
  let lPage = false;
  if (pageData.page == 1) {
    fPage = true;
  }
  if (pageData.page == pageData.totalPages) {
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
            { ' selectedPage': pageData.page === val },
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
