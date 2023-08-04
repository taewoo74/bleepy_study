import DateSelete from '../../../components/DateSelete.tsx';
import { useState, useEffect } from 'react';
import { monthDateFormat } from '../../../utils/utils.ts';
import { getMau } from '../../../apis/insightApi/insightapi.ts';
import {
  chartNameType,
  chartSizeType,
} from '../../../views/home/homeComponent/HomeChart.tsx';
import Chart from '../../../components/Chart.tsx';
import xlsx from '../../../assets/img/xlsx.png';
import { mauColumns } from '../../../data/data.tsx';
import Table from '../../../components/Table.tsx';

interface MauViewType {
  settingPopup: (
    str: string,
    str2: string,
    str3: string,
    str4: string,
    bol: boolean,
  ) => void;
}

interface MauDataType {
  yearMonth: string;
  visitCount: number;
  mau: number;
  returningVisitorCount: number;
}

export interface mauTableDataType {
  id: number;
  date: string;
  visitCount: number;
  mau: number;
  prevMau: number | string;
  returningVisitorCount: number;
}

export interface mauChartDataType {
  name: string;
  visitCount: number;
  mau: number;
  returningVisitorCount: number;
}

const dummyMauData = [
  {
    yearMonth: '2023.01',
    visitCount: 232,
    mau: 153,
    returningVisitorCount: 543,
  },
  {
    yearMonth: '2023.02',
    visitCount: 134,
    mau: 534,
    returningVisitorCount: 423,
  },
  {
    yearMonth: '2023.03',
    visitCount: 432,
    mau: 641,
    returningVisitorCount: 340,
  },
  {
    yearMonth: '2023.04',
    visitCount: 353,
    mau: 431,
    returningVisitorCount: 543,
  },
];

const MauView = ({ settingPopup }: MauViewType) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [datePickerFormat, setDatePickerFormat] = useState<string>('yyyy.MM');
  const [tableData, setTableData] = useState<mauTableDataType[]>();
  const [chartData, setChartData] = useState<Array<mauChartDataType>>([]);
  const [nameData, setNameData] = useState<chartNameType[]>([
    { name: '', dataKey: '', color: '' },
  ]);
  const [chartSize, setChartSize] = useState<chartSizeType>({
    width: 0,
    height: 0,
  });

  const submitMauData = async () => {
    const mauData = {
      startMonth: monthDateFormat(startDate),
      endMonth: monthDateFormat(endDate),
    };
    // const mau = await getMau(mauData);
    const mau = dummyMauData;
    settingChartData(mau);
    settingTableData(mau);
  };

  const settingTableData = (chartData: MauDataType[]) => {
    const result: mauTableDataType[] = [];
    chartData.forEach((val: MauDataType, index: number) => {
      const obj: mauTableDataType = {
        id: 0,
        date: '',
        visitCount: 0,
        mau: 0,
        prevMau: '',
        returningVisitorCount: 0,
      };

      obj.id = index;
      obj.date = val.yearMonth;
      obj.visitCount = val.visitCount;
      obj.mau = val.mau;
      obj.returningVisitorCount = val.returningVisitorCount;
      if (index === 0) {
        obj.prevMau = '-';
      } else {
        obj.prevMau = val.mau - chartData[index - 1].mau;
      }
      result.push(obj);
    });
    setTableData(result);
  };

  const settingChartData = (chartData: MauDataType[]) => {
    const columnData: mauChartDataType[] = [];
    chartData.forEach((arr: MauDataType) => {
      const result = {
        name: arr.yearMonth,
        visitCount: arr.visitCount,
        mau: arr.mau,
        returningVisitorCount: arr.returningVisitorCount,
      };
      columnData.push(result);
    });
    setChartData(columnData);

    const name: chartNameType[] = [
      { dataKey: 'visitCount', color: '#FF3D00', name: '방문횟수' },
      { dataKey: 'mau', color: '#FF7A30', name: '월간활성사용자(MAU)' },
      {
        dataKey: 'returningVisitorCount',
        color: '#FFECDE',
        name: '재 방문자 수',
      },
    ];
    setNameData(name);

    const size: chartSizeType = {
      width: 1123,
      height: 290,
    };
    setChartSize(size);
  };

  /* 시작 일짜 바꿔주는 함수 */
  const onChangeStartDate = (date: Date) => {
    if (endDate.getTime() < date.getTime()) {
      settingPopup(
        '조회 일자 확인',
        '조회 종료일보다 조회 시작일이 클 수 없습니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    const diffTime = Math.abs(date.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 365) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 1년 입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setStartDate(new Date(date));
  };

  const onClickExcel = () => {
    settingPopup(
      '현재 준비중인 서비스입니다.',
      '조금만 기다려주세요.',
      '확인',
      '',
      true,
    );
  };

  /* 끝나는 일자 바꿔주는 함수 */
  const onChangeEndDate = (date: Date) => {
    const diffTime = Math.abs(startDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 365) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 1년 입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setEndDate(new Date(date));
  };

  const settingDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    setStartDate(new Date(year - 1, month));
    setEndDate(new Date(year, month - 1));
  };

  useEffect(() => {
    settingDate();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex ml-auto">
        <DateSelete
          startDate={startDate}
          onChangeStartDate={onChangeStartDate}
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          datePickerFormat={datePickerFormat}
          state={true}
        />
        <div
          onClick={submitMauData}
          className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
        >
          조회
        </div>
      </div>
      <div className="w-f flex flex-col">
        <div className="mt-10 flex w-f flex-col">
          <div className="flex text-xl font-bold">
            월별 활성사용자수 (MAU) 그래프
          </div>

          <div className="flex w-f h-[285px] mt-4">
            <Chart
              chartData={chartData}
              nameData={nameData}
              chartSize={chartSize}
            />
          </div>

          {!!tableData && (
            <div className="flex mt-8 w-f flex-col">
              <div
                onClick={onClickExcel}
                className="flex bg-[#EEEEEE] w-[120px] h-[31px] text-[11px] py-1.5 px-4 ml-auto mb-2 rounded"
              >
                <img className="w-[16px] h-[16px] mt-0.5 mr-[3px]" src={xlsx} />
                엑셀 다운로드
              </div>
              <Table tableData={tableData} columns={mauColumns} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MauView;
