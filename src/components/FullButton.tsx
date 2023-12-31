import { CheckBox } from '../stories/checkbox/checkBox';
import { Button } from '../stories/button/Button';
import { MouseEvent } from 'react';

interface propsType {
  text: string;
  LoginSubmit(): void;
  buttonState: boolean;
}

const FullButton = ({ text, LoginSubmit, buttonState }: propsType) => {
  return (
    <>
      <div
        onClick={LoginSubmit}
        className={
          'w-f h-bh text-center leading-10' +
          (buttonState ? ' bg-og' : ' bg-slate-200')
        }
      >
        <span className={buttonState ? ' text-white' : ''}>{text}</span>
      </div>
      {/* <Button /> */}
    </>
  );
};

export default FullButton;
