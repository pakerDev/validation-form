import { useEffect, useState } from "react";
import { Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { CloudDownload, CloudUpload, Edit, Delete, SwapVert } from "@mui/icons-material";
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

    const sortClickHandler = () => {
        if (savedDataJson.length < 2) return;
        const isIncreasing = savedDataJson[0].createTime <= savedDataJson[1].createTime;
        const updatedJson = [...savedDataJson];
        if (isIncreasing) {
            updatedJson.sort(function (a, b) {
                return b.createTime - a.createTime;
            });
        } else {
            updatedJson.sort(function (a, b) {
                return a.createTime - b.createTime;
            });
        }
        setSavedDataJson(updatedJson);
    };

    useEffect(() => {
        setSavedDataJson(fetchData());
    }, [editorModalProp.type, data]);

    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell align='right' sx={{ width: 220 }}>
                        {"縮圖"}
                    </TableCell>
                    <TableCell align='left' sx={{ width: 120 }}>
                        {"標題"}
                    </TableCell>
                    <TableCell align='left' sx={{ width: 120 }}>
                        {"標籤"}
                    </TableCell>
                    <TableCell align='right' sx={{ width: 40 }}>
                        {"書籤"}
                    </TableCell>
                    <TableCell align='right' sx={{ width: 120 }}>
                        {"狀態"}
                    </TableCell>
                    <TableCell align='right' sx={{ width: 160 }}>
                        <Button variant='text' startIcon={<SwapVert />} onClick={sortClickHandler}>
                            上傳時間
                        </Button>
                    </TableCell>
                    <TableCell align='center' sx={{ width: 160 }}>
                        {"操作"}
                    </TableCell>
                </TableRow>
            </TableHead>
            {savedDataJson.map((data: IMainData) => {
                return (
                    <>
                        <TableBody className='row' key={data.videoURL}>
                            <TableRow>
                                <CustomStudioItem data={data} />
                                <TableCell align='center'>
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
                                    <div className='row'>
                                        <Button
                                            startIcon={<Edit />}
                                            onClick={() => editClickHandler(data.videoURL)}
                                            size='small'
                                        >
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
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </>
                );
            })}

            {
                <CustomEditorModal
                    closePopupHandler={() => setEditorModalProp({ type: "", data: undefined })}
                    {...editorModalProp}
                />
            }
        </>
    );
};

export default CustomStudioContainer;
