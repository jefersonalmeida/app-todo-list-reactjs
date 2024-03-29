import {ButtonHTMLAttributes} from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function Button({children, ...props}: ButtonProps) {
  return (
      <button className={styles.container} {...props}>{children}</button>
  );
}
