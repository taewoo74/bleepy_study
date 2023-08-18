import './checkBox.scss';
import classNames from 'classnames';

export interface checkBoxProps {
  size?: 's' | 'm' | 'l' | 'xl';
  checked?: boolean;
  disable?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
}

export const CheckBox = ({
  checked,
  size,
  onChange,
  disable,
  readOnly,
  indeterminate,
  ...props
}: checkBoxProps) => {
  return (
    <>
      <input
        className={classNames('checkboxComponent', size, { indeterminate })}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disable}
        readOnly={readOnly}
        {...props}
      />
      <label className={classNames(size, { indeterminate })} />
    </>
  );
};
