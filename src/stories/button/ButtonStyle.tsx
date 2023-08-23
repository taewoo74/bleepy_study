import styled, { css } from 'styled-components';
import { sizeType, shapeType } from '../TypeStories';
import { darken, lighten } from 'polished';
import { ButtonProps } from './Button';

type colorStyleType = {
  [key: string]: string;
};

const colorStyle: colorStyleType = {
  primary: '#1976d2',
  success: '#2e7d32',
  danger: '#ff3232',
  warning: '#ff8e0d',
};

// 특정 색상을 리턴하거나 내가 원하는 커스텀 색상 리턴해줌
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

// 버튼 사이즈 css 리턴 , 커스텀 가능
const buttonSize = (size: sizeType) => {
  if (size === 'medium') {
    return;
  }

  if (size === 'large') {
    return {
      fontSize: '1.125rem',
      padding: '6px 20px',
    };
  }

  if (size === 'small') {
    return {
      padding: '4px 14px',
      minWidth: '60px',
    };
  }

  return size;
};

// 모양과 색상을 받아 해당 모양의 css 를 리턴 해줌
const buttonShape = (shape: shapeType, color: string | undefined) => {
  if (shape === 'plain') {
    return {
      backgroundColor: 'transparent',
      color: `${backgroundColor(color)}`,
    };
  }
  if (shape === 'outlined') {
    return {
      backgroundColor: 'transparent',
      border: `1px solid ${backgroundColor(color)}`,
      color: `${backgroundColor(color)}`,
    };
  }
  if (shape === 'soft') {
    return {
      backgroundColor: `${lighten(0.14, backgroundColor(color))}`,
    };
  }
  if (shape === 'contained') {
    return;
  }
  return shape;
};

export const StyledButton = styled.button<ButtonProps>`
  position: relative;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  font-weight: 500;
  font-size: 0.875rem;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 4px;
  color: white;

  /* background */
  ${(props) => {
    return css`
      background-color: ${backgroundColor(props.color)};
    `;
  }}

  /* hover */
  ${(props) => {
    if (props.hover === true) {
      return css`
        &:hover {
          background-color: ${darken(0.1, backgroundColor(props.color))};
          color: white;
        }
      `;
    }
  }}
  
  /* shape */
  ${(props) => {
    if (props.shape) {
      return css`
        ${buttonShape(props.shape, props.color)}
      `;
    }
  }}
  
 /* size */
  ${(props) => {
    if (props.size) {
      return css`
        ${buttonSize(props.size)}
      `;
    }
  }}
  
  /* focus */
  ${(props) => {
    if (props.focus === true) {
      return css`
        box-shadow:
          0 5px 20px 0 rgb(61 71 82 / 0.1),
          0 0 0 3px rgb(0 127 255 / 0.2);
      `;
    }
  }}
  
  /* disabled */
  ${(props) => {
    if (props.disabled === true) {
      if (props.shape === 'outlined') {
        return css`
          border-color: rgba(0, 0, 0, 0.12);
          color: rgba(0, 0, 0, 0.26);
          cursor: default;
          pointer-events: none;
        `;
      } else if (props.shape === 'plain') {
        return css`
          color: rgba(0, 0, 0, 0.26);
          cursor: default;
          pointer-events: none;
        `;
      } else {
        return css`
          color: rgba(0, 0, 0, 0.26);
          box-shadow: none;
          background-color: rgba(0, 0, 0, 0.12);
          cursor: default;
          pointer-events: none;
        `;
      }
    }
  }}
`;
