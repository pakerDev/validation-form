import { Stack, Switch, Typography } from "@mui/material";

interface ICustomSwitch {
    leftString?: string;
    rightString?: string;
    switchStatus: (checked: boolean) => void;
}

const CustomSwitch = (props: ICustomSwitch) => {
    const { leftString, rightString, switchStatus } = props;

    const switchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        switchStatus(checked);
    };
    return (
        <div>
            <Stack direction='row' spacing={1} alignItems='center'>
                <Typography>{leftString}</Typography>
                <Switch
                    onChange={(e) => {
                        switchChangeHandler(e);
                    }}
                />
                <Typography>{rightString}</Typography>
            </Stack>
        </div>
    );
};

export default CustomSwitch;
