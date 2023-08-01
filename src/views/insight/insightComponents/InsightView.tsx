import { useState } from 'react';
import { visitorType } from '../Insight.tsx';
import { chartDataType } from '../../home/Home.tsx';
import { columns1, columns2 } from '../../../data/data.tsx';
import Chart from '../../../components/Chart.tsx';
import Table from '../../../components/Table.tsx';
import xlsx from '../../../assets/img/xlsx.png';
import icon from '../../../assets/img/icon.png';

interface InsightViewType {
  visitorData: visitorType;
  chartData: chartDataType;
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
  const [tooltip, setTooltip] = useState<boolean>(false);

  const onClickExcel = () => {
    settingPopup(
      '현재 준비중인 서비스입니다.',
      '조금만 기다려주세요.',
      '확인',
      '',
      true,
    );
  };

  const colums = columns1;
  if (tabState === 'MAU') columns2;

  return (
    <div className="w-f">
      {tabState === 'DAU' && (
        <>
          <div className="text-xl font-bold">조회기간별 방문현황 합계</div>
          <div className="mt-4 flex">
            <div className="num_container flex-row flex">
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
                    <p>
                      방문 횟수는 사용자가 게임에 접속한 횟수를 집계합니다.{' '}
                    </p>
                    <p>
                      동일 사용자가 30분 내 재접속 시 집계에 포함되지 않습니다.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-14 mr-4">{visitorData.visitorTotal}</div>
            </div>
            <div className="num_container flex-row flex">
              <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
                일일활성사용자
              </div>
              <div className="mt-14 mr-4">{visitorData.dau}</div>
            </div>
            <div className="num_container flex-row flex">
              <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
                신규 방문자 수
              </div>
              <div className="mt-14 mr-4">{visitorData.visitor}</div>
            </div>
            <div className="num_container flex-row flex">
              <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
                재 방문자 수
              </div>
              <div className="mt-14 mr-4">{visitorData.returnVisitor}</div>
            </div>
          </div>
        </>
      )}

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
              {' '}
              <img
                className="w-[16px] h-[16px] mt-0.5 mr-[3px]"
                src={xlsx}
              />{' '}
              엑셀 다운로드
            </div>
            <Table
              tableData={tableData}
              columns={colums}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightView;
