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
