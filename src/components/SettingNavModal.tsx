import { Box, Button, ButtonProps, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SettingNavList, allTagsType } from "../constant/types";
import { tagIconConfig } from "../constant/configs";
import { fetchNav } from "../constant/main";
import { useState } from "react";

interface IProps {
    closePopupHandler: () => void;
}

const SettingNavModal = (props: IProps) => {
    const { closePopupHandler } = props;
    const navList = fetchNav() as allTagsType[];
    const [newNav, setNewNav] = useState<allTagsType[]>(navList);

    const saveNavHandler = () => {
        localStorage.setItem("nav", newNav.sort().join());
        closePopupHandler();
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e.currentTarget.id as allTagsType;
        const tagArray = [...newNav];
        let newTagArray = ["all", "bookmark", "yellow"] as allTagsType[];

        if (newNav.includes(id)) {
            newTagArray = tagArray.filter((tag: allTagsType) => tag !== id);
        } else {
            newTagArray = [...tagArray, id];
        }

        setNewNav(newTagArray);
    };

    return (
        <>
            <div className='modal'>
                <div className='navModalWrapper'>
                    <div className='warningModalHeader'>
                        <Box width={40}></Box>
                        {"編輯快選"}
                        <IconButton onClick={closePopupHandler}>
                            <CloseIcon className='modalCloseBtn' />
                        </IconButton>
                    </div>
                    <div>
                        {SettingNavList.map((i, idx) => {
                            return (
                                <Button
                                    key={idx}
                                    id={i}
                                    variant={newNav.includes(i) ? "contained" : "outlined"}
                                    size='small'
                                    color={tagIconConfig[i].color as ButtonProps["color"]}
                                    startIcon={
                                        newNav.includes(i) ? tagIconConfig[i].checkedIcon : tagIconConfig[i].icon
                                    }
                                    onClick={(e) => handleClick(e)}
                                >
                                    {tagIconConfig[i].label}
                                </Button>
                            );
                        })}
                    </div>

                    <div className='modalFooter'>
                        <Button className='modalBtn' onClick={closePopupHandler}>
                            取消
                        </Button>
                        <Button className='modalBtn' onClick={saveNavHandler}>
                            儲存
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingNavModal;
