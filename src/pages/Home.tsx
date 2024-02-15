import CustomDropDown from "../components/CustomDropDown";
import { useEffect, useState } from "react";
import { mainData } from "../constant/configs";
import CustomPreview from "../components/CustomPreview";
import CustomPreviewPro from "../components/CustomPreviewPro";
import { IMainData, ISearchInfo, allTagsType } from "../constant/types";

const Home = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [isCardMode, setIsCardMode] = useState(true);
    const savedDataJson = JSON.parse(localStorage.getItem("mainData") ?? "");

    const dropDownHandler = (mode: string) => {
        if (mode === "cardMode") {
            setIsCardMode((i) => !i);
        }
    };

    return (
        <>
            <div className='row homeHead'>
                <span></span>
                <CustomDropDown homeViewMode={(mode: string) => dropDownHandler(mode)} />
            </div>

            <div className='viewContainer'>
                {savedDataJson.map((data: IMainData) => {
                    return isCardMode ? <CustomPreview data={data} /> : <CustomPreviewPro data={data} />;
                })}
                {/* <CustomEditorModal type='' data={mainData[0]} /> */}
            </div>
        </>
    );
};

export default Home;
