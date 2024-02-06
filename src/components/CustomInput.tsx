import { Input, InputLabel, FormControl, FormHelperText, TextField, TextFieldPropsSizeOverrides } from "@mui/material";

interface ICustomInput {
    className?: string;
    id: string;
    inputLabel: string;
    helperText?: string;
    required?: boolean;
    fullWidth?: boolean;
    value?: unknown;
    isSmall?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const CustomInput = (prop: ICustomInput) => {
    const { className, id, inputLabel, helperText, required = false, value, fullWidth, onChange } = { ...prop };
    return (
        <div className='row customInputRow'>
            <FormControl>
                <TextField
                    label={inputLabel}
                    defaultValue={value}
                    required={required}
                    id={id}
                    fullWidth={fullWidth}
                    onChange={onChange}
                    size='small'
                    type='search'
                />
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default CustomInput;
