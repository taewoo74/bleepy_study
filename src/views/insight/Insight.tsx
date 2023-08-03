import InsightHeader from './insightComponents/InsightHeader';
import { useAppDispatch } from '../../store';
import popupSlice from '../../store/slice/popup.ts';

import { useState, useEffect } from 'react';
import DauView from '../insight/insightComponents/DauView.tsx';
import MauView from '../insight/insightComponents/MauView.tsx';

const Insight = () => {
  const [tabState, setTabState] = useState<string>('DAU');
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

  /* 탭 변경시 새로고침 함수 */

  const onClickTabMenu = async (tab: string) => {
    setTabState(tab);
  };

  return (
    <div className="flex flex-col w-[1220px] pt-10 px-10">
      <InsightHeader onClickTabMenu={onClickTabMenu} tabState={tabState} />
      {tabState === 'DAU' && <DauView settingPopup={settingPopup} />}
      {tabState === 'MAU' && <MauView settingPopup={settingPopup} />}
    </div>
  );
};

export default Insight;
