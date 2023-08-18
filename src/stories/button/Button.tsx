import './button.scss';
import classNames from 'classnames';
import spinner from '../assets/Spinner-1s-200px.gif';

export interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  classname?: string;
  theme: 'default' | 'success' | 'warning' | 'danger' | 'black' | 'white';
  size: 'medium' | 'small' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  loading = false,
  disabled = false,
  classname,
  size,
  theme,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames('storybook-button', size, classname, theme, {
        disabled,
      })}
      type="button"
      {...props}
    >
      {loading && <img className="spinner_size" src={spinner} />}
      {!loading && label}
    </button>
  );
};
