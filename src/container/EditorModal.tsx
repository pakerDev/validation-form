import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button, Box } from "@mui/material";
import UploadModal from "../components/UploadModal";
import { IMainData, IEditorModal } from "../constant/types";
import { tempData } from "../constant/configs";

interface IProps {
    type: "WARNING" | "EDITOR" | "UPLOAD" | "PREVIEW";
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
    const { closePopupHandler, confirmPopupHandler, type, data } = { ...props };
    const { Content, BtnCancel, BtnConfirm } = render[type];

    //todo temp模板塞這裡

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
                    <Content data={data} />
                </div>
                <div className='modalFooter'>
                    <Button className='modalBtn' onClick={closePopupHandler}>
                        {BtnCancel}
                    </Button>

                    {/* todo 鎖submit */}
                    <Button className='modalBtn' onClick={confirmPopupHandler}>
                        {BtnConfirm}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditorModal;
