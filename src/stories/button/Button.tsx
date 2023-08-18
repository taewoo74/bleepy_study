import './button.scss';
import classNames from 'classnames';
import spinner from '../assets/Spinner-1s-200px.gif';
import { ButtonHTMLAttributes } from 'react';

type themeType =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'
  | 'white'; // 공통으로 사용

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  active?: boolean;
  theme: themeType; // 커스텀 가능하도록
  size: 'medium' | 'small' | 'large'; // 공통으로 사용
  label: string;
}

// 공통으로 타입 따로 선언해서 가져옴 , 여기서만 쓰는것만 씀

export const Button = ({
  loading = false,
  size, // 디폴트값 넣어줘야함  디폴트는 항상 프라이머리 (스타일 , 테마)
  theme,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames('storybook-button', size, theme)}
      type="button"
      {...props}
    >
      {loading && <img className="spinner_size" src={spinner} />}
      {!loading && label}
    </button>
  );
};
