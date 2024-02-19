import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CloudDownload, CloudUpload, Edit, Delete } from "@mui/icons-material";
import { IMainData, TModal } from "../constant/types";
import CustomEditorModal from "../container/CustomEditorModal";
import CustomStudioItem from "./CustomStudioItem";
import { fetchData, findData } from "../constant/main";

const CustomStudioContainer = ({ data }: { data: IMainData[] }) => {
    const [savedDataJson, setSavedDataJson] = useState(data);
    const [editorModalProp, setEditorModalProp] = useState<{ type: TModal; data: IMainData | undefined }>({
        type: "",
        data: undefined,
    });

    const uploadClickHandler = (code: string) => {
        const { dataIndex } = findData(code);
        if (dataIndex !== -1) {
            savedDataJson[dataIndex].isUploaded = !savedDataJson[dataIndex].isUploaded;
            localStorage.setItem("mainData", JSON.stringify(savedDataJson));
            setSavedDataJson(fetchData());
        }
    };

    const editTempClickHandler = () => {
        const tempDataJson = JSON.parse(localStorage.getItem("tempData") ?? "");
        setEditorModalProp({ type: "EDITOR", data: tempDataJson });
    };

    const editClickHandler = (code: string) => {
        const { dataIndex } = findData(code);
        if (dataIndex !== -1) {
            setEditorModalProp({ type: "EDITOR", data: savedDataJson[dataIndex] });
        }
    };

    const dropClickHandler = (code: string) => {
        const { dataIndex } = findData(code);
        if (dataIndex !== -1) {
            savedDataJson.splice(dataIndex, 1);
            localStorage.setItem("mainData", JSON.stringify(savedDataJson));
            setSavedDataJson(fetchData());
        }
    };

    useEffect(() => {
        setSavedDataJson(fetchData());
    }, [editorModalProp.type, data]);

    return (
        <div>
            <Button variant='outlined' startIcon={<Edit />} onClick={() => editTempClickHandler()}>
                編輯模板
            </Button>
            {savedDataJson.map((data: IMainData) => {
                return (
                    <div className='row' key={data.videoURL}>
                        <CustomStudioItem data={data} />

                        <div className='customStudioItem'>
                            <div className='column customStudioItem'>
                                {data.isUploaded ? (
                                    <Button
                                        startIcon={<CloudDownload />}
                                        onClick={() => uploadClickHandler(data.videoURL)}
                                        variant='outlined'
                                        color='error'
                                    >
                                        下架影片
                                    </Button>
                                ) : (
                                    <Button
                                        startIcon={<CloudUpload />}
                                        onClick={() => uploadClickHandler(data.videoURL)}
                                        variant='contained'
                                        color='success'
                                    >
                                        上架影片
                                    </Button>
                                )}
                            </div>
                            <Button startIcon={<Edit />} onClick={() => editClickHandler(data.videoURL)} size='small'>
                                編輯
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                onClick={() => dropClickHandler(data.videoURL)}
                                size='small'
                                color='warning'
                            >
                                丟棄
                            </Button>
                        </div>
                    </div>
                );
            })}

            {
                <CustomEditorModal
                    closePopupHandler={() => setEditorModalProp({ type: "", data: undefined })}
                    {...editorModalProp}
                />
            }
        </div>
    );
};

export default CustomStudioContainer;
