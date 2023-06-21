import type { ReactNode } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";

export type Props = {
  children: ReactNode;
};

export default forwardRef(({ children }: Props, ref) => {
  // Notify model we can toggle
  const [open, setOpen] = useState(true);

  useImperativeHandle(ref, () => ({
    isOpend: open,
    close() {
      setOpen(false);
    },
    open() {
      setOpen(true);
    },
  }));

  return <div> {open ? children : null}</div>;
});
