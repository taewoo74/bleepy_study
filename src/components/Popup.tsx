import error from '../assets/img/Error.png';
import warning from '../assets/img/warning.png';
import popupStore from '../zustand/popup/popup.tsx';

const Popup = () => {
  const { popupData, setState } = popupStore();
  const { type, title, text, button } = popupData;

  const popupClose = () => {
    setState({ ...popupData, popupState: false });
  };

  return (
    <div className="popup_box absolute w-pw h-ph rounded-lg shadow-md bg-white border-gray-200 border p-6 text-center flex flex-col items-center">
      <div className="mt-2">
        <img src={type === 'error' ? error : warning} />
      </div>
      <div className="mt-6 text-lg font-bold">{title}</div>
      <div className="text-base mt-1">{text}</div>
      <div
        className={type === 'error' ? 'warrning_button' : 'error_button'}
        onClick={popupClose}
      >
        {button}
      </div>
    </div>
  );
};

export default Popup;
