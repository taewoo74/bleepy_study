import InsightHeader from './insightComponents/InsightHeader';
import { useState } from 'react';
import DauView from '../insight/insightComponents/DauView.tsx';
import MauView from '../insight/insightComponents/MauView.tsx';

const Insight = () => {
  const [tabState, setTabState] = useState<string>('DAU');

  /* 탭 변경시 새로고침 함수 */

  const onClickTabMenu = async (tab: string) => {
    setTabState(tab);
  };

  return (
    <div className="flex flex-col w-[1220px] pt-10 px-10">
      <InsightHeader onClickTabMenu={onClickTabMenu} tabState={tabState} />
      {tabState === 'DAU' && <DauView />}
      {tabState === 'MAU' && <MauView />}
    </div>
  );
};

export default Insight;
