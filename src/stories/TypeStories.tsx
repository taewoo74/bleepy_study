export type colorType = 'primary' | 'success' | 'warning' | 'danger' | string; // 공통으로 사용
export type sizeType = 'small' | 'medium' | 'large' | string;
export type shapeType = 'contained' | 'outlined' | 'plain' | 'soft' | string;

export type defaultComponentType = {
  disable?: boolean;
  color?: colorType;
  size?: sizeType;
};
