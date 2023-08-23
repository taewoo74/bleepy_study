import './button.css';
import { ButtonHTMLAttributes } from 'react';
import { defaultComponentType, shapeType } from '../TypeStories';
import { StyledButton } from './ButtonStyle';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    defaultComponentType {
  hover?: boolean;
  focus?: boolean;
  shape?: shapeType;
  loading?: boolean;
  loadingPostion?: 'left' | 'right';
  leftIcon?: React.ReactNode;
  righticon?: React.ReactNode;
  buttonText?: React.ReactNode;
}

export const Button = ({
  disable = false,
  color = 'primary',
  focus = false,
  hover = false,
  shape = 'contained',
  size = 'medium',
  loading = false,
  loadingPostion = 'left',
  leftIcon,
  righticon,
  buttonText = '확인',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      color={color}
      size={size}
      hover={hover}
      shape={shape}
      focus={focus}
      disabled={disable}
      {...props}
    >
      {loading && loadingPostion === 'left' && <span className="loader"></span>}
      {leftIcon && leftIcon}
      {buttonText}
      {righticon && righticon}
      {loading && loadingPostion === 'right' && (
        <span className="loader"></span>
      )}
    </StyledButton>
  );
};
