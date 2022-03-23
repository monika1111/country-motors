import React, { useCallback, useEffect, useRef, useState } from "react";

import "./index.scss";
import { useTranslation } from "react-i18next";

interface IProps {
  options: Option[];
  value?: any;
  handleSelect: CallableFunction;
  onBlur?: CallableFunction;
  name?: string;
  error?: string;
  classNames?: string;
}

const DropDown = ({ options, value, handleSelect, onBlur, error, classNames = "" }: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>({} as Option);

  const { t } = useTranslation("common");

  const dropDownHolderRef = useRef<HTMLDivElement>(null);

  const closeDropDown = useCallback(
    (event) => {
      if (
        dropDownHolderRef.current &&
        !dropDownHolderRef.current.contains(event.relatedTarget)
      ) {
        setIsOpened(false);
        onBlur && onBlur(value);
      }
    },
    [onBlur, value]
  );

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
      className={`dropdown-holder ${classNames}`}
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
            <span>{t(selectedOption.label)}</span>
          </div>
          <i className="icon-chevron-down-solid" />
        </div>
      </div>
      {error && <div className="error-msg">{t(error)}</div>}
      {isOpened && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div className="dropdown-option" key={option.value}>
              <p onClick={() => onSelect(option.value)}>
                {option.icon && <i className={`opt-i ${option.icon}`} />}
                <span>{t(option.label)}</span>
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
