import { Checkbox } from "@mui/material";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { allTagsType } from "../constant/types";

interface ICustomInput {
    className?: string;
    id: string;
    inputLabel: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    defaultValue?: unknown;
    value?: string | allTagsType;
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
        id,
        inputLabel,
        helperText,
        required = false,
        disabled = false,
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

    const [count, setCount] = useState(value?.length ?? 0);

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        if (!!maxLength && e.target.value.length >= maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
        }
        onChange && onChange(e);
        setCount(e.target.value.length);
    };

    useEffect(() => {
        setCount(value?.length ?? 0);
    }, [value]);

    return (
        <div className='row customInputRow fullWidth'>
            {isShowCheckBox && <Checkbox id={id} onClick={onClick} checked={isChecked} />}
            <FormControl className='fullWidth'>
                <TextField
                    className='fullWidth'
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
                    maxRows={3}
                    disabled={disabled}
                />
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            {!!maxLength && <span className='customInputCount'>{`${count}/${maxLength}`}</span>}
        </div>
    );
};

export default CustomInput;
