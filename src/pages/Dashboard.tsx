import CustomDropDown from "../components/CustomDropDown";
import { useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import { mainData } from "../constant/configs";
import CustomStudioContainer from "../components/CustomStudioContainer";
import CustomEditorModal from "../container/CustomEditorModal";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchData } from "../constant/main";
import { IMainData, TModal } from "../constant/types";

const Dashboard = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [savedDataJson, setSavedDataJson] = useState(fetchData());
    const [isUpload, setIsUpload] = useState(false);
    const [editorModalProp, setEditorModalProp] = useState<{ type: TModal; data: IMainData | undefined }>({
        type: "",
        data: undefined,
    });

    const dropDownHandler = (mode: string) => {
        if (mode === "upload") {
            setIsUpload(true);
        }
        if (mode === "editTemp") {
            editTempClickHandler();
        }
    };

    const editTempClickHandler = () => {
        const tempDataJson = JSON.parse(localStorage.getItem("tempData") ?? "");
        setEditorModalProp({ type: "EDITOR", data: tempDataJson });
    };

    const closePopupHandler = () => {
        setIsUpload(false);
        setSavedDataJson(fetchData());
    };

    return (
        <>
            <div className='row homeHead'>
                <Link to='/'>
                    <IconButton color='primary'>
                        <HouseIcon />
                    </IconButton>
                </Link>
                <CustomDropDown homeViewMode={(mode: string) => dropDownHandler(mode)} />
            </div>

            <div className='viewContainer'>
                <CustomStudioContainer data={savedDataJson} />
            </div>
            {isUpload && <CustomEditorModal type='UPLOAD' closePopupHandler={closePopupHandler} />}
            {
                <CustomEditorModal
                    closePopupHandler={() => setEditorModalProp({ type: "", data: undefined })}
                    {...editorModalProp}
                />
            }
        </>
    );
};

export default Dashboard;
