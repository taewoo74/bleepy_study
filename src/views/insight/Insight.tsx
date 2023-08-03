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

import { useState, useEffect } from 'react';
// import { chartDataType , columnDataType , subDataType } from '../home/Home.tsx';
import { useLocation } from 'react-router-dom';
import DauView from '../insight/insightComponents/DauView.tsx';
import MauView from '../insight/insightComponents/MauView.tsx';

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
  const location = useLocation();

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

  /* 조회 클릭시 데이터 불러오는 함수 */
  // const onClickSubmit = async () => {
  //   if (tabState === 'DAU') submitInsightData();
  //   if (tabState === 'MAU') submitMauData();
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

  return (
    <div className="flex flex-col w-[1220px] pt-10 px-10">
      <InsightHeader onClickTabMenu={onClickTabMenu} />
      {tabState === 'DAU' && <DauView settingPopup={settingPopup} />}

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
