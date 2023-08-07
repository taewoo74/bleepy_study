import DateSelete from '../../../components/DateSelete.tsx';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import icon from '../../../assets/img/icon.png';
import { dateFormat } from '../../../utils/utils.ts';
import {
  getDau,
  getNewVisitor,
  getReturnVisitor,
  getDateVisits,
} from '../../../apis/insightApi/insightapi.ts';
import {
  chartNameType,
  chartSizeType,
} from '../../../views/home/homeComponent/HomeChart.tsx';
import Chart from '../../../components/Chart.tsx';
import xlsx from '../../../assets/img/xlsx.png';
import Table from '../../../components/Table.tsx';
import { dauColumns } from '../../../data/data.tsx';

interface DauViewType {
  settingPopup: (
    str: string,
    str2: string,
    str3: string,
    str4: string,
    bol: boolean,
  ) => void;
}

export type visitorType = {
  visitorTotal: number;
  dau: number;
  visitor: number;
  returnVisitor: number;
};

interface VisitDataType {
  date: string;
  visitCount: number;
  dau: number;
  newVisitorCount: number;
  returningVisitorCount: number;
}

export interface dauChartDataType {
  name: string;
  visitCount: number;
  dau: number;
  newVisitorCount: number;
  returningVisitorCount: number;
}

export interface dauTableDataType {
  id: number;
  date: string;
  visitCount: number;
  dau: number;
  evedau: number | string;
  newVisitorCount: number;
  returningVisitorCount: number;
}

const dummyDau = 1342232;
const dummyVisitor = 234232;
const dummyReturnVisitor = 42232;
const dummyDauChartData = [
  {
    date: '2023-08-03',
    visitCount: 18432,
    dau: 93543,
    newVisitorCount: 44356,
    returningVisitorCount: 75376,
  },
  {
    date: '2023-08-04',
    visitCount: 14259,
    dau: 75423,
    newVisitorCount: 46486,
    returningVisitorCount: 47526,
  },
  {
    date: '2023-08-05',
    visitCount: 12456,
    dau: 14323,
    newVisitorCount: 35789,
    returningVisitorCount: 23147,
  },
  {
    date: '2023-08-06',
    visitCount: 12746,
    dau: 95426,
    newVisitorCount: 12478,
    returningVisitorCount: 44312,
  },
  {
    date: '2023-08-07',
    visitCount: 52210,
    dau: 65231,
    newVisitorCount: 23154,
    returningVisitorCount: 45675,
  },
];

const DauView = ({ settingPopup }: DauViewType) => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [tableData, setTableData] = useState<dauTableDataType[]>();
  const [visitorData, SetVisitorData] = useState<visitorType>({
    visitorTotal: 0,
    dau: 0,
    visitor: 0,
    returnVisitor: 0,
  });
  const [datePickerFormat, setDatePickerFormat] =
    useState<string>('yyyy.MM.dd');

  const [chartData, setChartData] = useState<Array<dauChartDataType>>([]);
  const [nameData, setNameData] = useState<chartNameType[]>([
    { name: '', dataKey: '', color: '' },
  ]);
  const [chartSize, setChartSize] = useState<chartSizeType>({
    width: 0,
    height: 0,
  });

  /* 날짜 바꿨을때 날짜데이터 셋팅해주는 함수 */
  /**
   *
   * @param date
   */
  const DateSetting = (date: number) => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    setStartDate(new Date(year, month, day - date));
    setEndDate(new Date(year, month, day - 1));
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
      DateSetting(8);
      return;
    }
    const diffTime = Math.abs(date.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 90일입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setStartDate(new Date(date));
  };

  /* 끝나는 일자 바꿔주는 함수 */
  const onChangeEndDate = (date: Date) => {
    const diffTime = Math.abs(startDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 90일입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setEndDate(new Date(date));
  };

  const submitInsightData = async () => {
    const data = {
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
    };
    // const dau = await getDau(data);
    // const visitor = await getNewVisitor(data);
    // const returnVisitor = await getReturnVisitor(data);
    const dau = dummyDau;
    const visitor = dummyVisitor;
    const returnVisitor = dummyReturnVisitor;

    const visitorTotal = dau + visitor + returnVisitor;
    const result: visitorType = { visitorTotal, dau, visitor, returnVisitor };
    SetVisitorData(result);
    getChartData(data);
  };

  const getChartData = async (data: { startDate: string; endDate: string }) => {
    const chartData = await getDateVisits(data);
    // const chartData = dummyDauChartData;
    settingChartData(chartData);
    settingTableData(chartData);
  };

  const settingTableData = (chartData: VisitDataType[]) => {
    const result: dauTableDataType[] = [];
    chartData.forEach((val: VisitDataType, index: number) => {
      const obj: dauTableDataType = {
        id: 0,
        date: '',
        visitCount: 0,
        dau: 0,
        evedau: '',
        newVisitorCount: 0,
        returningVisitorCount: 0,
      };

      obj.id = index;
      obj.date = val.date;
      obj.visitCount = val.visitCount;
      obj.newVisitorCount = val.newVisitorCount;
      obj.dau = val.dau;
      obj.returningVisitorCount = val.returningVisitorCount;
      if (index === 0) {
        obj.evedau = '-';
      } else {
        obj.evedau = val.dau - chartData[index - 1].dau;
      }
      result.push(obj);
    });
    setTableData(result);
  };

  /* Chart 데이터 가공해주는 함수 */
  const settingChartData = async (chartData: VisitDataType[]) => {
    const columnData: dauChartDataType[] = [];
    chartData.forEach((arr: VisitDataType) => {
      const result = {
        name: arr.date,
        ...arr,
      };
      columnData.push(result);
    });
    setChartData(columnData);

    const name: chartNameType[] = [
      { dataKey: 'visitCount', color: '#FF3D00', name: '방문횟수' },
      { dataKey: 'dau', color: '#FF7A30', name: '일일활성사용자(DAU)' },
      {
        dataKey: 'newVisitorCount',
        color: '#FCB25C',
        name: '신규 방문자 수',
      },
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

  /* 엑셀 클릭시 팝업창 생성 */
  const onClickExcel = () => {
    settingPopup(
      '현재 준비중인 서비스입니다.',
      '조금만 기다려주세요.',
      '확인',
      '',
      true,
    );
  };

  const didate = (start: Date, end: Date, num: number) => {
    const di = end.getTime() - start.getTime();
    const diTime = di / (1000 * 60 * 60 * 24);
    if (num === diTime) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    DateSetting(8);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex ml-auto">
        <div
          className={classNames('small_button', {
            on: didate(startDate, endDate, 1),
          })}
          onClick={() => DateSetting(1)}
        >
          전일
        </div>
        <div
          className={classNames('small_button', {
            on: didate(startDate, endDate, 7),
          })}
          onClick={() => DateSetting(8)}
        >
          일주일
        </div>
        <div
          className={classNames('small_button', {
            on: didate(startDate, endDate, 30),
          })}
          onClick={() => DateSetting(31)}
        >
          1개월
        </div>
        <div
          className={classNames('small_button', {
            on: didate(startDate, endDate, 90),
          })}
          onClick={() => DateSetting(91)}
        >
          3개월
        </div>

        <DateSelete
          startDate={startDate}
          onChangeStartDate={onChangeStartDate}
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          datePickerFormat={datePickerFormat}
          state={false}
        />
        <div
          onClick={submitInsightData}
          className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
        >
          조회
        </div>
      </div>

      <div className="text-xl font-bold mt-8">조회기간별 방문현황 합계</div>
      <div className="mt-4 flex">
        <div className="num_container flex-col flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto flex direction-row relative">
            방문횟수
            <img
              onMouseOver={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              className="w-[13px] h-[13px] flex mt-0.5 ml-0.5"
              src={icon}
            />
            {tooltip && (
              <div className="absolute w-[321px] h-[54px] bg-black p-2.5 left-[65px] rounded-[3px] text-white">
                <p>방문 횟수는 사용자가 게임에 접속한 횟수를 집계합니다. </p>
                <p>동일 사용자가 30분 내 재접속 시 집계에 포함되지 않습니다.</p>
              </div>
            )}
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.visitorTotal.toLocaleString()}
          </div>
        </div>
        <div className="num_container flex-col flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto flex direction-row">
            일일활성사용자
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.dau.toLocaleString()}
          </div>
        </div>
        <div className="num_container flex-col flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto flex direction-row">
            신규 방문자 수
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.visitor.toLocaleString()}
          </div>
        </div>
        <div className="num_container flex-col flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto flex direction-row">
            재 방문자 수
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.returnVisitor.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="w-f flex">
        <div className="mt-10 flex w-f flex-col">
          <div className="flex text-xl font-bold">일별 방문현황 그래프</div>
          <div className="w-f h-[280px]">
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
              <Table tableData={tableData} columns={dauColumns} />
            </div>
          )}
          {/* <Table2 /> */}
        </div>
      </div>
    </div>
  );
};
export default DauView;
