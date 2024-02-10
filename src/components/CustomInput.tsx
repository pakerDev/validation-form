import { Checkbox } from "@mui/material";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

interface ICustomInput {
    className?: string;
    id: string;
    inputLabel: string;
    helperText?: string;
    required?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    defaultValue?: unknown;
    value?: unknown;
    isSmall?: boolean;
    isShowCheckBox?: boolean;
    isChecked?: boolean;
    maxLength?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomInput = (prop: ICustomInput) => {
    const {
        className,
        id,
        inputLabel,
        helperText,
        required = false,
        error = false,
        fullWidth = false,
        value,
        maxLength,
        isShowCheckBox = false,
        isChecked = true,
        onChange,
        onBlur,
        onClick,
    } = prop;

    const [count, setCount] = useState(0);

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        if (!!maxLength && e.target.value.length >= maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }
        onChange && onChange(e);
        setCount(e.target.value.length);
    };

    return (
        <div className='row customInputRow'>
            {isShowCheckBox && <Checkbox id={id} onClick={onClick} checked={isChecked} />}
            <FormControl>
                <TextField
                    label={inputLabel}
                    value={value}
                    required={required}
                    id={id}
                    fullWidth={fullWidth}
                    onChange={handleChange}
                    size='small'
                    type='search'
                    onBlur={onBlur}
                    error={error}
                    multiline
                />
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            {!!maxLength && <span className='customInputCount'>{`${count}/${maxLength}`}</span>}
        </div>
    );
};

export default CustomInput;
