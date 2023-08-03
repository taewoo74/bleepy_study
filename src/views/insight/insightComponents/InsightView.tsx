import { useState } from 'react';
import { visitorType } from '../Insight.tsx';
import { chartDataType } from '../../home/Home.tsx';
import { columns1, columns2 } from '../../../data/data.tsx';
import Chart from '../../../components/Chart.tsx';
import Table from '../../../components/Table.tsx';
import xlsx from '../../../assets/img/xlsx.png';
import icon from '../../../assets/img/icon.png';

interface InsightViewType {
  visitorData: Partial<visitorType>;
  chartData: Partial<chartDataType>;
  tableData: any;
  settingPopup: (
    str: string,
    str2: string,
    str3: string,
    str4: string,
    bol: boolean,
  ) => void;
  tabState: string;
}

const InsightView = ({
  visitorData,
  chartData,
  tableData,
  settingPopup,
  tabState,
}: InsightViewType) => {
  let colums = columns1;
  if (tabState === 'MAU') colums = columns2;

  return (
    <div className="w-f">
      {tabState === 'DAU' && <></>}

      <div className="mt-10  h-[300px]">
        <div className="text-xl font-bold">
          {tabState === 'DAU' && '일별 방문현황 그래프'}
          {tabState === 'MAU' && '월별 활성사용자수(MAU) 그래프'}
        </div>
        <div className="w-f h-[280px]">
          <Chart chartData={chartData} />
        </div>
        {!!tableData && (
          <div className="mt-8 w-f">
            <div
              onClick={onClickExcel}
              className="flex bg-[#EEEEEE] w-[120px] h-[31px] text-[11px] py-1.5 px-4 ml-auto mb-2 rounded"
            >
              <img className="w-[16px] h-[16px] mt-0.5 mr-[3px]" src={xlsx} />
              엑셀 다운로드
            </div>
            <Table tableData={tableData} columns={colums} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightView;
