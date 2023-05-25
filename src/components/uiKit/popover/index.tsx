import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

import "./index.scss";

interface IProps {
  content?: JSX.Element;
  placement?: Placement;
  type?: "click" | "hover";
  appearance?: "default" | "tooltip";
  className?: string;
}

const Popover: React.FC<IProps> = ({
  content,
  children,
  placement = "right-start",
  type = "hover",
  appearance = "default",
  className,
}) => {
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const [visible, setVisibility] = useState(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });

  const handleDocumentClickOrHover = useCallback(
    (event: any) => {
      if (
        (popperElement && popperElement.contains(event.target)) ||
        (referenceElement && referenceElement.contains(event.target))
      ) {
        setVisibility(true);

        return;
      }
      setVisibility(false);
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    const eventType = type === "click" ? "mousedown" : "mousemove";

    // listen for clicks and close dropdown on body
    document.addEventListener(eventType, handleDocumentClickOrHover);
    return () => {
      document.removeEventListener(eventType, handleDocumentClickOrHover);
    };
  }, [handleDocumentClickOrHover, type]);

  return (
    <>
      <div className={"popover-reference"} ref={setReferenceElement}>
        {children}
      </div>
      {visible &&
        content &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={{ ...styles.popper, position: "fixed" }}
            {...attributes.popper}
            className={`popover-positioner-j`}
          >
            <div className="popover-j">
              <ul className="popover-content-j">
                <li className="popover-body-j">{content}</li>
              </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Popover;
