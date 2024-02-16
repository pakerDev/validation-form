import CustomDropDown from "../components/CustomDropDown";
import { useState } from "react";
import { mainData } from "../constant/configs";
import CustomPreview from "../components/CustomPreview";
import CustomPreviewPro from "../components/CustomPreviewPro";
import { IMainData } from "../constant/types";
import Studio from "../components/CustomStudioContainer";
import { fetchData } from "../constant/main";

const Home = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const savedDataJson = fetchData();
    const [isCardMode, setIsCardMode] = useState(true);
    const [isHomePage, setIsHomePage] = useState(true);

    const dropDownHandler = (mode: string) => {
        if (mode === "cardMode") {
            setIsCardMode((i) => !i);
        }
        if (mode === "studio") {
            setIsHomePage((i) => !i);
        }
    };

    return (
        <>
            {isHomePage ? (
                <>
                    <div className='row homeHead'>
                        <span></span>
                        <CustomDropDown homeViewMode={(mode: string) => dropDownHandler(mode)} />
                    </div>
                </>
            ) : (
                <div className='row homeHead'>
                    <span></span>
                    <CustomDropDown homeViewMode={(mode: string) => dropDownHandler(mode)} />
                </div>
            )}
            <div className='viewContainer'>
                {savedDataJson.map((data: IMainData) => {
                    return isHomePage ? (
                        isCardMode ? (
                            <CustomPreview data={data} />
                        ) : (
                            <CustomPreviewPro data={data} />
                        )
                    ) : (
                        <Studio />
                    );
                })}
            </div>
        </>
    );
};

export default Home;
