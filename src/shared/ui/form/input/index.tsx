import clsx from "clsx";
import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { prefixEl?: ReactNode };

export const Input: FC<InputProps> = ({ className, prefixEl, ...props }) => {
  return (
    <label className="input-group">
      {prefixEl && <>{prefixEl}</>}
      <input className={clsx("input", className)} {...props} />
    </label>
  );
};
