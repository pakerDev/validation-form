import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button, Box } from "@mui/material";
import UploadModal from "../components/UploadModal.tsx";
import EditModal from "../components/EditModal.tsx";
import { IMainData, IEditorModal, TModal } from "../constant/types.ts";
import { tempData } from "../constant/configs.tsx";
import { checkCanSubmit, fetchData } from "../constant/main.ts";
import { useState } from "react";

interface IProps {
    type: TModal;
    closePopupHandler: () => void;
    confirmPopupHandler?: () => void;
    data?: IMainData;
}

const render: {
    [k in string]: { Content: React.ComponentType<IEditorModal>; BtnCancel: string; BtnConfirm: string };
} = {
    UPLOAD: {
        Content: UploadModal,
        BtnCancel: "取消",
        BtnConfirm: "儲存",
    },
    EDITOR: {
        Content: EditModal,
        BtnCancel: "取消",
        BtnConfirm: "儲存",
    },
};

localStorage.setItem("tempData", JSON.stringify(tempData));

const CustomEditorModal = (props: IProps) => {
    const { closePopupHandler, type, data } = props;
    if (type === null || type === "" || type === undefined) return;

    const { Content, BtnCancel, BtnConfirm } = render[type];
    const [canSubmit, setCanSubmit] = useState(false);
    const [formData, setFormData] = useState<IMainData>();

    const contentDataHandler = (data: IMainData) => {
        setCanSubmit(checkCanSubmit(data));
        setFormData(data);
    };

    const handleConfirmClick = () => {
        let mainDataArray: IMainData[] = fetchData();
        if (type === "EDITOR") {
            if (formData?.videoURL === "https://youtu.be/ObVSC-kTR6g?si=bIcS231uMsFCAtmu") {
                localStorage.setItem("tempData", JSON.stringify(formData));
            } else {
                mainDataArray = mainDataArray.map((item) => (item.videoURL === formData?.videoURL ? formData : item));
            }
        } else if (type === "UPLOAD") {
            !!formData && mainDataArray.push(formData);
        }
        localStorage.setItem("mainData", JSON.stringify(mainDataArray));
        closePopupHandler();
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
                        info={data}
                        modelData={(contentData) => {
                            contentDataHandler(contentData);
                        }}
                    />
                </div>
                <div className='modalFooter'>
                    <Button className='modalBtn' onClick={closePopupHandler}>
                        {BtnCancel}
                    </Button>

                    <Button className='modalBtn' onClick={handleConfirmClick} disabled={!canSubmit}>
                        {BtnConfirm}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomEditorModal;
