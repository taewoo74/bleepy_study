import { RootState } from "../store/reducer";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../store"
import popupSlice from "../store/slice/popup";
import error from "../assets/img/Error.png";
import warning from "../assets/img/warning.png";

const Popup = () => {
    const { title, text, button, type } = useSelector((state: RootState) => state.popup);
    const dispatch = useAppDispatch();

    const popupClose = () => {
        dispatch(popupSlice.actions.setPopup({ popupState: false }))
    }

    return (
        <div className='absolute w-pw h-ph rounded-lg shadow-md bg-white border-gray-200 border p-6 text-center flex flex-col items-center' >
            <div className="mt-2" >
                <img src={type == "error" ? error : warning} />
            </div>
            <div className='mt-6 text-lg font-bold' >{title}</div>
            <div className='text-base mt-1' >{text}</div>
            <div className={type == "error" ? "warrning_button" : "error_button"  } onClick={popupClose} >{button}</div>
        </div>
    )
};

export default Popup;

