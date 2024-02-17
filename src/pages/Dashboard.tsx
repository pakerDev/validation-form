import CustomDropDown from "../components/CustomDropDown";
import { useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import { mainData } from "../constant/configs";
import CustomStudioContainer from "../components/CustomStudioContainer";
import CustomEditorModal from "../container/CustomEditorModal";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [isUpload, setIsUpload] = useState(false);

    const dropDownHandler = (mode: string) => {
        if (mode === "upload") {
            setIsUpload(true);
        }
    };

    const closePopupHandler = () => {
        setIsUpload(false);
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
                <CustomStudioContainer />
            </div>
            {isUpload && <CustomEditorModal type='UPLOAD' closePopupHandler={closePopupHandler} />}
        </>
    );
};

export default Dashboard;
