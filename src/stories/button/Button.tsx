import './button.scss';
import classNames from 'classnames';
import spinner from '../assets/Spinner-1s-200px.gif';

export interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  focused?: boolean;
  hovered?: boolean;
  classname?: string;
  /**
   * Is this the principal call to action on the page?
   */
  // primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size: 'medium' | 'small' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  loading = false,
  disabled = false,
  focused = false,
  hovered = false,
  classname,
  size,
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        'storybook-button',
        size,
        classname,
        { disabled },
        { hovered },
        { focused },
      )}
      type="button"
      style={{ backgroundColor }}
      {...props}
    >
      {loading && <img className="spinner_size" src={spinner} />}
      {!loading && label}
    </button>
  );
};
