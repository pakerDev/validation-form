import { Stack, Switch, Typography } from "@mui/material";
import React from "react";

interface ICustomSwitch {
    leftString?: string;
    rightString?: string;
}

const CustomSwitch = (props: ICustomSwitch) => {
    const { leftString, rightString } = { ...props };
    return (
        <div>
            <Stack direction='row' spacing={1} alignItems='center'>
                <Typography>{leftString}</Typography>
                <Switch />
                <Typography>{rightString}</Typography>
            </Stack>
        </div>
    );
};

export default CustomSwitch;
