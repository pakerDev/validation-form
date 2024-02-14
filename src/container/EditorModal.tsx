import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button, Box } from "@mui/material";
import UploadModal from "../components/UploadModal.tsx";
import { IMainData, IEditorModal, TModal } from "../constant/types.ts";
import { tempData } from "../constant/configs";
import { checkCanSubmit } from "../constant/main";
import { useState } from "react";

interface IProps {
    type: TModal;
    closePopupHandler: () => void;
    confirmPopupHandler: () => void;
    data: IMainData;
}

const render: {
    [k in string]: { Content: React.ComponentType<IEditorModal>; BtnCancel: string; BtnConfirm: string };
} = {
    UPLOAD: {
        Content: UploadModal,
        BtnCancel: "取消",
        BtnConfirm: "儲存",
    },
    // todo

    // EDITOR: {
    //     Content: ,
    // BtnCancel: "cancel",
    // BtnConfirm: "save",
    // },
};

localStorage.setItem("tempData", JSON.stringify(tempData));

const EditorModal = (props: IProps) => {
    const { closePopupHandler, confirmPopupHandler, type, data } = props;
    if (type === null || type === "" || type === undefined) return;
    const { Content, BtnCancel, BtnConfirm } = render[type];
    const [canSubmit, setCanSubmit] = useState(false);

    const contentDataHandler = (data: IMainData) => {
        setCanSubmit(checkCanSubmit(data));
    };

    return (
        <div className='modal'>
            <div className='modalWrapper'>
                <div className='modalHeader'>
                    <Box width={40}></Box>
                    {type}
                    <IconButton onClick={closePopupHandler}>
                        <CloseIcon className='modalCloseBtn' />
                    </IconButton>
                </div>
                <div className='modalBody'>
                    <Content
                        data={data}
                        modelData={(contentData) => {
                            contentDataHandler(contentData);
                        }}
                    />
                </div>
                <div className='modalFooter'>
                    <Button className='modalBtn' onClick={closePopupHandler}>
                        {BtnCancel}
                    </Button>

                    {/* todo 鎖submit */}
                    <Button className='modalBtn' onClick={confirmPopupHandler} disabled={!canSubmit}>
                        {BtnConfirm}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditorModal;
