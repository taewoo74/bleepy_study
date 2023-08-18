import { ChangeEvent } from 'react';

type propsType = {
  title: string;
  placeholder: string;
  value: string;
  InputChangeValue: (e: ChangeEvent<HTMLInputElement>, title: string) => void;
};

const InputForm = ({
  title,
  placeholder,
  InputChangeValue,
  value,
}: propsType) => {
  return (
    <div className="w-f h-tch flex items-start flex-col">
      <span className="text-sm text-orange-400">{title}</span>
      <input
        type={title === '비밀번호' ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => InputChangeValue(e, title)}
        className="w-f border border-gray-300 border-x-0 border-t-0 h-ih mt-1"
      />
    </div>
  );
};

export default InputForm;
