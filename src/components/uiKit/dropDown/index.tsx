import React, { useCallback, useEffect, useRef, useState } from "react";

import "./index.scss";

interface IProps {
  options: Option[];
  value?: any;
  handleSelect: CallableFunction;
}

const DropDown = ({ options, value, handleSelect }: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>({} as Option);

  const dropDownHolderRef = useRef<HTMLDivElement>(null);

  const closeDropDown = useCallback((event) => {
    if (
      dropDownHolderRef.current &&
      !dropDownHolderRef.current.contains(event.relatedTarget)
    ) {
      setIsOpened(false);
    }
  }, []);

  const onSelect = (value: any) => {
    handleSelect(value);
    setIsOpened(false);
  };

  useEffect(() => {
    const currentOption = options?.find((option) => option.value === value);

    currentOption && setSelectedOption(currentOption);
  }, [options, value]);

  return (
    <div
      className="dropdown-holder"
      tabIndex={0}
      onBlur={(event) => closeDropDown(event)}
      ref={dropDownHolderRef}
    >
      <div
        className="select-value-holder"
        onClick={() => setIsOpened((prevState) => !prevState)}
      >
        <div className="value-holder">
          <div className="select-value">
            {selectedOption.icon && (
              <i className={`opt-i ${selectedOption.icon}`} />
            )}
            <span>{selectedOption.label}</span>
          </div>
          <i className="icon-chevron-down-solid" />
        </div>
      </div>
      {isOpened && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div className="dropdown-option">
              <p onClick={() => onSelect(option.value)}>
                {option.icon && <i className={`opt-i ${option.icon}`} />}
                <span>{option.label}</span>
              </p>
              {option.value === value && <i className="icon-check-solid" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
