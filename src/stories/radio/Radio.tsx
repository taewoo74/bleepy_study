import './Radio.scss';
import classNames from 'classnames';

export interface RadioType {
  size?: 's' | 'm' | 'l' | 'xl';
  checked?: boolean;
  disable?: boolean;
  readOnly?: boolean;
  value?: string;
  onChange?: () => void;
}

export const Radio = ({
  checked,
  size,
  onChange,
  disable,
  readOnly,
  value,
  ...props
}: RadioType) => {
  return (
    <>
      <input
        className={classNames('checkboxComponent', size, { readOnly })}
        type="radio"
        {...props}
        checked={checked}
        onChange={onChange}
        disabled={disable}
        value={value}
      />
    </>
  );
};
