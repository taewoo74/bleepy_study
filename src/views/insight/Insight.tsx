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
import { dateFormat, dateFormat2 } from '../../utils/utils.ts';
import { useState, useEffect } from 'react';
import { chartDataType } from '../home/Home.tsx';
import { useLocation } from 'react-router-dom';

export type visitorType = {
  visitorTotal: number;
  dau: number;
  visitor: number;
  returnVisitor: number;
};

const Insight = () => {
  const location = useLocation();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [visitorData, SetVisitorData] = useState<visitorType>({
    visitorTotal: 0,
    dau: 0,
    visitor: 0,
    returnVisitor: 0,
  });
  const [dateState, setDateState] = useState<string>('default');
  const [tableData, setTableData] = useState<string>();
  const [tabState, setTabState] = useState<string>('DAU');
  const [datePickerFormat, setDatePickerFormat] =
    useState<string>('yyyy-MM-dd');
  const [chartData, setChartData] = useState<chartDataType>({
    widht: 0,
    height: 0,
    grid: false,
    chartLine: [],
    LineArr: [{ dataKey: '', color: '', name: '' }],
  });
  const dispatch = useAppDispatch();

  const DateSetting = (date: number, state: string) => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();

    if (state === 'MAU') {
      setStartDate(new Date(year - 1, month - 1));
      setEndDate(new Date(year, month));
      return;
    }

    setStartDate(new Date(year, month, day - date));
    setEndDate(new Date(year, month, day - 1));
    setDateState(state);
  };

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
    setStartDate(new Date(date));
  };

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

  const onClickSubmit = async () => {
    if (tabState === 'DAU') submitInsightData();
    if (tabState === 'MAU') submitMauData();
  };

  const submitInsightData = async () => {
    const data = {
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
    };
    const dau = await getDau(data);
    const visitor = await getNewVisitor(data);
    const returnVisitor = await getReturnVisitor(data);
    const visitorTotal = dau + visitor + returnVisitor;
    const result: visitorType = { visitorTotal, dau, visitor, returnVisitor };
    SetVisitorData(result);
    getChartData(data);
  };

  const submitMauData = async () => {
    const mauData: { startMonth: string; endMonth: string } = {
      startMonth: dateFormat2(startDate),
      endMonth: dateFormat2(endDate),
    };
    const mau = await getMau(mauData);
    settingTableData(mau);
    settingChartData(mau);
  };

  const getChartData = async (data: { startDate: string; endDate: string }) => {
    const chartData = await getDateVisits(data);
    settingTableData(chartData);
    settingChartData(chartData);
  };

  const settingChartData = async (chartData: any) => {
    let chartLine: Array<any> = [];
    chartData.forEach((arr: any) => {
      if (tabState === 'DAU') arr.name = arr.date;
      if (tabState === 'MAU') arr.name = arr.yearMonth;
      chartLine.push(arr);
    });

    let LineArr: any = [];

    if (tabState === 'MAU') {
      LineArr = [
        { dataKey: 'visitCount', color: '#FF3D00', name: '방문횟수' },
        { dataKey: 'mau', color: '#FF7A30', name: '월간활성사용자(MAU)' },
        {
          dataKey: 'returningVisitorCount',
          color: '#FFECDE',
          name: '재 방문자 수',
        },
      ];
    }

    if (tabState === 'DAU') {
      LineArr = [
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
    }

    const result: chartDataType = {
      widht: 1123,
      height: 290,
      grid: false,
      chartLine: chartLine,
      LineArr: LineArr,
    };
    setChartData(result);
  };

  const settingTableData = (chartData: any) => {
    let result: any = [];
    chartData.forEach((val: any, index: number) => {
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

  const onClickTabMenu = async (tab: string) => {
    window.location.replace(`/insight?${tab}`);
  };

  useEffect(() => {
    const tab = location.search;
    if (tab === '?MAU') {
      setTabState('MAU');
      DateSetting(0, 'MAU');
      setDatePickerFormat('yyyy-MM');
      return;
    }

    DateSetting(8, 'default');
  }, []);

  return (
    <div className="flex flex-col w-[1220px] pt-10 px-10">
      <InsightHeader
        onChangeStartDate={onChangeStartDate}
        DateSetting={DateSetting}
        onClickSubmit={onClickSubmit}
        onChangeEndDate={onChangeEndDate}
        startDate={startDate}
        endDate={endDate}
        tabState={tabState}
        onClickTabMenu={onClickTabMenu}
        dateState={dateState}
        datePickerFormat={datePickerFormat}
      />
      <InsightView
        visitorData={visitorData}
        chartData={chartData}
        tableData={tableData}
        settingPopup={settingPopup}
        tabState={tabState}
      />
    </div>
  );
};

export default Insight;
