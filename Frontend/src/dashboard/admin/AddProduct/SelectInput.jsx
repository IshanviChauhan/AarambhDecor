import React, { useState } from 'react';

const SelectInput = ({ label, name, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    // Create a synthetic event object to pass to the parent's handleChange
    const syntheticEvent = {
      target: {
        name: name,
        value: optionValue,
      },
    };
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === value)?.label || 'Select an option';

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
        >
          <span className="block truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <i className={`ri-arrow-down-s-line text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option.value)}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-light"
              >
                <span className={`block truncate ${value === option.value ? 'font-semibold' : 'font-normal'}`}>
                  {option.label}
                </span>

                {value === option.value ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                    <i className="ri-check-line" aria-hidden="true" />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectInput;