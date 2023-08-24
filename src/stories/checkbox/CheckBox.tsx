import './checkBox.css';
import { defaultComponentType } from '../TypeStories';
import { InputHTMLAttributes } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';

type colorStyleType = {
  [key: string]: string;
};

const colorStyle: colorStyleType = {
  primary: '#1976d2',
  success: '#2e7d32',
  danger: '#ff3232',
  warning: '#ff8e0d',
};

const backgroundColor = (color: string | undefined) => {
  if (color === undefined) {
    color = 'primary';
  }
  if (colorStyle[color] === undefined) {
    return color;
  } else {
    return colorStyle[color];
  }
};

export const StyledCheckbox = styled.input<checkBoxProps>`
  /* background */
  ${(props) => {
    return css`
      accent-color: ${backgroundColor(props.color)};
    `;
  }}

  ${(props) => {
    if (props.indeterminate === true) {
      return css`
        display: none;
      `;
    }
  }}
`;

export interface checkBoxProps
  extends defaultComponentType,
    InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  indeterminate?: boolean;
  onChange?: () => void;
  customization?: React.ReactNode;
  mutiful?: React.ReactNode;
  direction?: 'primary' | 'row';
  labelplacement?: 'top' | 'right' | 'bottom' | 'left';
  label?: React.ReactNode;
}

export const CheckBox = ({
  checked,
  size,
  onChange,
  disable,
  indeterminate,
  defaultChecked,
  value,
  label,
  ...props
}: checkBoxProps) => {
  return (
    <>
      <div>
        {label && <label></label>}
        <StyledCheckbox
          type="checkbox"
          checked={checked}
          disabled={disable}
          onChange={onChange}
          defaultChecked={defaultChecked}
          value={value}
          indeterminate={indeterminate}
          {...props}
        />
        {indeterminate && <label data-custom="indeterminate"></label>}
      </div>
    </>
  );
};
