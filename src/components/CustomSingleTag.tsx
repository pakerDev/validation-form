import React from "react";
import { Checkbox } from "@mui/material/";
import { allTagsType } from "../constant/types";
import { tagIconConfig } from "../constant/configs";

interface ICustomTagProp {
    type: allTagsType;
    isChecked?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isShowLabel?: boolean;
}

const CustomSingleTag = (props: ICustomTagProp) => {
    const { type, isChecked = true, onClick, isShowLabel = false } = props;
    const { icon, checkedIcon, color, label } = tagIconConfig[type];

    // todo label color

    return (
        <div className='row'>
            <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isChecked}
                color={color}
                id={type}
                onClick={onClick}
            />
            {isShowLabel && (
                <label className='CustomIconBtnLabel' htmlFor={type} color={color}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default CustomSingleTag;
