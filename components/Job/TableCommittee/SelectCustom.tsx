import React from 'react';

interface Props {
    options: { value: string; label: string }[];
    // onChange: (value: string) => void;
    value: string;
}

const SelectCustom: React.FC<Props> = ({ options, value }) => {
    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     onChange(event.target.value);
    // };

    return (
        <select value={value}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectCustom;
