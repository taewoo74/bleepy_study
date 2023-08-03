import InsightHeader from './insightComponents/InsightHeader';
import InsightView from './insightComponents/InsightView';
import { useAppDispatch } from '../../store';
import popupSlice from '../../store/slice/popup.ts';
import {
  getDau,
  getNewVisitor,
  getReturnVisitor,
  getDateVisits,
  getMau,
} from '../../apis/insightApi/insightapi.ts';
import { dateFormat, monthDateFormat } from '../../utils/utils.ts';
import { useState, useEffect } from 'react';
// import { chartDataType , columnDataType , subDataType } from '../home/Home.tsx';
import { useLocation } from 'react-router-dom';
import DauView from '../insight/insightComponents/DauView.tsx';
import MauView from '../insight/insightComponents/MauView.tsx';

export type visitorType = {
  visitorTotal: number;
  dau: number;
  visitor: number;
  returnVisitor: number;
};

type tableDataType = {
  evedau: number | string;
  prevmau: number | string;
  date: string;
  visitCount: number;
  id: number;
  mau: any;
  dau: any;
  newVisitorCount: number;
  returningVisitorCount: number;
};

const Insight = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [datePickerFormat, setDatePickerFormat] =
    useState<string>('yyyy-MM-dd');

  const location = useLocation();
  const [visitorData, SetVisitorData] = useState<Partial<visitorType>>({});
  const [dateState, setDateState] = useState<string>('default');
  const [tableData, setTableData] = useState<Partial<tableDataType>[]>();
  const [tabState, setTabState] = useState<string>('DAU');
  const [chartData, setChartData] = useState<chartDataType>({
    widht: 0,
    height: 0,
    grid: false,
    columnData: [],
    subData: [{ dataKey: '', color: '', name: '' }],
  });
  const dispatch = useAppDispatch();

  /* 날짜 바꿨을때 날짜데이터 셋팅해주는 함수 */
  const DateSetting = (date: number) => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    setStartDate(new Date(year, month, day - date));
    setEndDate(new Date(year, month, day - 1));

    // if (state === 'MAU') {
    // setStartDate(new Date(year - 1, month - 1));
    // setEndDate(new Date(year, month));
    // return;
    // }
    // setDateState(state);
  };

  /* 팝업창 셋팅하고 열어주는 함수 */
  const settingPopup = (
    title: string,
    text: string,
    button: string,
    type: string,
    popupState: boolean,
  ) => {
    dispatch(
      popupSlice.actions.setPopup({
        title: title,
        text: text,
        button: button,
        type: type,
        popupState: popupState,
      }),
    );
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
    if (diffDays > 90 && tabState != 'MAU') {
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

  /* 조회 클릭시 데이터 불러오는 함수 */
  // const onClickSubmit = async () => {
  //   if (tabState === 'DAU') submitInsightData();
  //   if (tabState === 'MAU') submitMauData();
  // };

  //  /* DAU 탭일때 조회 클릭시 데이터 불러와줌 */
  // const submitInsightData = async () => {
  //   const data = {
  //     startDate: dateFormat(startDate),
  //     endDate: dateFormat(endDate),
  //   };
  //   const dau = await getDau(data);
  //   const visitor = await getNewVisitor(data);
  //   const returnVisitor = await getReturnVisitor(data);
  //   const visitorTotal = dau + visitor + returnVisitor;
  //   const result: visitorType = { visitorTotal, dau, visitor, returnVisitor };
  //   SetVisitorData(result);
  //   getChartData(data);
  // };

  //  /* MAU 탭일때 조회 클릭시 데이터 불러와줌 */
  // const submitMauData = async () => {
  //   const mauData: { startMonth: string; endMonth: string } = {
  //     startMonth: monthDateFormat(startDate),
  //     endMonth: monthDateFormat(endDate),
  //   };
  //   const mau = await getMau(mauData);
  //   settingTableData(mau);
  //   settingChartData(mau);
  // };

  // /* Chart 데이터 가져와주는 함수 */
  // const getChartData = async (data: { startDate: string; endDate: string }) => {
  //   const chartData = await getDateVisits(data);
  //   settingTableData(chartData);
  //   settingChartData(chartData);
  // };

  /* Chart 데이터 가공해주는 함수 */
  // const settingChartData = async (chartData: Array<Partial<tableDataType>>) => {
  //   let columnData: columnDataType[] = [];
  //   chartData.forEach((arr: any) => {
  //     if (tabState === 'DAU') arr.name = arr.date;
  //     if (tabState === 'MAU') arr.name = arr.yearMonth;
  //     columnData.push(arr);
  //   });

  //   let subData: subDataType[] = [];

  //   if (tabState === 'MAU') {
  //     subData = [
  //       { dataKey: 'visitCount', color: '#FF3D00', name: '방문횟수' },
  //       { dataKey: 'mau', color: '#FF7A30', name: '월간활성사용자(MAU)' },
  //       {
  //         dataKey: 'returningVisitorCount',
  //         color: '#FFECDE',
  //         name: '재 방문자 수',
  //       },
  //     ];
  //   }

  //   if (tabState === 'DAU') {
  //     subData = [
  //       { dataKey: 'visitCount', color: '#FF3D00', name: '방문횟수' },
  //       { dataKey: 'dau', color: '#FF7A30', name: '일일활성사용자(DAU)' },
  //       {
  //         dataKey: 'newVisitorCount',
  //         color: '#FCB25C',
  //         name: '신규 방문자 수',
  //       },
  //       {
  //         dataKey: 'returningVisitorCount',
  //         color: '#FFECDE',
  //         name: '재 방문자 수',
  //       },
  //     ];
  //   }

  //   const result: chartDataType = {
  //     widht: 1123,
  //     height: 290,
  //     grid: false,
  //     columnData: columnData,
  //     subData: subData,
  //   };
  //   setChartData(result);
  // };

  /* 테이블 데이터 가공해주는 함수 */
  const settingTableData = (chartData: Array<Partial<tableDataType>>) => {
    let result: Array<Partial<tableDataType>> = [];
    chartData.forEach((val: Partial<tableDataType>, index: number) => {
      val.id = index;
      if (tabState === 'DAU') {
        if (index === 0) {
          val.evedau = '-';
        } else {
          val.evedau = val.dau - chartData[index - 1].dau;
        }
      }

      if (tabState === 'MAU') {
        if (index === 0) {
          val.prevmau = '-';
        } else {
          val.prevmau = val.mau - chartData[index - 1].mau;
        }
      }

      result.push(val);
    });
    setTableData(result);
  };

  /* 탭 변경시 새로고침 함수 */
  const onClickTabMenu = async (tab: string) => {
    window.location.replace(`/insight?${tab}`);
  };

  useEffect(() => {
    // const tab = location.search;
    // if (tab === '?MAU') {
    //   setTabState('MAU');
    //   DateSetting(0, 'MAU');
    //   setDatePickerFormat('yyyy-MM');
    //   return;
    // }
    DateSetting(8);
  }, []);

  return (
    <div className="flex flex-col w-[1220px] pt-10 px-10">
      <InsightHeader onClickTabMenu={onClickTabMenu} />
      {tabState === 'DAU' && (
        <DauView
          DateSetting={DateSetting}
          startDate={startDate}
          onChangeStartDate={onChangeStartDate}
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          datePickerFormat={datePickerFormat}
        />
      )}

      {/* <MauView /> */}

      {/* <InsightHeader
        onChangeStartDate={onChangeStartDate}
        DateSetting={DateSetting}
        onClickSubmit={onClickSubmit}
        onChangeEndDate={onChangeEndDate}
        startDate={startDate}
        endDate={endDate}
        tabState={tabState}
        
        dateState={dateState}
        datePickerFormat={datePickerFormat}
      />
      <InsightView
        visitorData={visitorData}
        chartData={chartData}
        tableData={tableData}
        settingPopup={settingPopup}
        tabState={tabState}
      /> */}
    </div>
  );
};

export default Insight;
