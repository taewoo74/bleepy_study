import './TextField.scss';
import classNames from 'classnames';
import { PiWarningCircleBold } from 'react-icons/pi';

export interface TextFieldType {
  value?: string;
  onchange?: () => void;
  title?: string;
  titleSize?: 's' | 'm' | 'l' | 'xl';
  size?: 's' | 'm' | 'l' | 'xl';
  title_sub?: boolean;
  type?: 'Contained' | 'Outlined' | 'Underlined';
  placeholder?: string;
  states?: 'disabled' | 'error' | 'focus';
  subText?: string;
  subTextType?: 'error' | 'normal';
  subIcon?: boolean;
  subtextSize?: 's' | 'm' | 'l' | 'xl';
}

export const TextField = ({
  title,
  value,
  onchange,
  titleSize,
  size,
  title_sub,
  type,
  placeholder,
  states,
  subIcon,
  subText,
  subTextType,
  subtextSize,
  ...props
}: TextFieldType) => {
  return (
    <>
      <div className={classNames('input_title', titleSize)}>
        {title}
        {title_sub && <span className="title_sub">*</span>}
      </div>
      <input
        className={classNames('inputComponent', type, states, size)}
        type="input"
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        {...props}
        readOnly={states === 'disabled' ? true : false}
      />
      <div>
        {subIcon && (
          <PiWarningCircleBold className="warning_icon" color="red" />
        )}
        <span className={classNames('subtitleText', subTextType, subtextSize)}>
          {subText}
        </span>
      </div>
    </>
  );
};
