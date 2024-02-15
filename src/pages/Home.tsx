import CustomSearch from "../components/CustomSearch";
import CustomDropDown from "../components/CustomDropDown";
import { useEffect, useState } from "react";
import { mainData } from "../constant/configs";
import CustomPreview from "../components/CustomPreview";
import CustomPreviewPro from "../components/CustomPreviewPro";
import { IMainData, ISearchInfo, allTagsType } from "../constant/types";
import Studio from "../components/CustomStudioContainer";
import VideoPage from "./VideoPage";
import CustomNav from "../components/CustomNav";
import CustomEditorModal from "../container/CustomEditorModal";
import WarningModal from "../components/WarningModal";

const Home = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [savedDataJson, setSavedDataJson] = useState(JSON.parse(localStorage.getItem("mainData") ?? ""));
    const [isCardMode, setIsCardMode] = useState(true);
    const [isHomePage, setIsHomePage] = useState(true);
    const [category, setCategory] = useState<allTagsType>("all");
    const [searchInfo, setSearchInfo] = useState<ISearchInfo>({ by: "title", keyWord: "" });

    const dropDownHandler = (mode: string) => {
        if (mode === "cardMode") {
            setIsCardMode((i) => !i);
        }
        if (mode === "studio") {
            setIsHomePage((i) => !i);
        }
    };

    const navClickHandler = (cate: allTagsType) => {
        setCategory(cate);
    };

    const searchBarHandler = ({ by, keyWord }: ISearchInfo) => {
        setSearchInfo({ by: by, keyWord: keyWord });
    };

    useEffect(() => {
        const allUploadedData = JSON.parse(localStorage.getItem("mainData") ?? "").filter(
            (i: IMainData) => i.isUploaded === true
        );

        let filteredData;
        if (searchInfo.by === "desc") {
            //todo 模糊搜尋
            if (searchInfo.keyWord === "") {
                filteredData = [...allUploadedData];
            } else {
                filteredData = allUploadedData.filter((item: IMainData) =>
                    item.desc.some((descItem) => descItem.includes(searchInfo.keyWord))
                );
            }
        } else {
            filteredData = allUploadedData.filter((item: IMainData) =>
                item[searchInfo.by].toString().includes(searchInfo.keyWord)
            );
        }

        if (category === "all") {
            setSavedDataJson(
                !!searchInfo.keyWord
                    ? filteredData.filter((item: IMainData) =>
                          item[searchInfo.by].toString().includes(searchInfo.keyWord)
                      )
                    : filteredData
            );
        } else if (category === "bookmark") {
            const allLickedData = filteredData.filter((i: IMainData) => i.isLiked === true);
            setSavedDataJson(
                !!searchInfo.keyWord
                    ? allLickedData.filter((item: IMainData) =>
                          item[searchInfo.by].toString().includes(searchInfo.keyWord)
                      )
                    : allLickedData
            );
        } else {
            const theTagData = filteredData.filter((i: IMainData) => i.tag.includes(category));
            setSavedDataJson(
                !!searchInfo.keyWord
                    ? theTagData.filter((item: IMainData) =>
                          item[searchInfo.by].toString().includes(searchInfo.keyWord)
                      )
                    : theTagData
            );
        }
    }, [category, searchInfo]);

    return (
        <>
            {isHomePage ? (
                <>
                    <div className='row homeHead'>
                        <span></span>

                        <CustomSearch
                            homeSearch={({ by, keyWord }: ISearchInfo) => searchBarHandler({ by, keyWord })}
                        />
                        <CustomDropDown homeViewMode={(mode: string) => dropDownHandler(mode)} />
                    </div>
                    <div className='row homeNav'>
                        <CustomNav
                            homeNavStatus={(category: allTagsType) => navClickHandler(category)}
                            status={category}
                        />
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
                {/* <CustomEditorModal type='' data={mainData[0]} /> */}
            </div>
            {/* <WarningModal handleConfirmClick={() => {}} closePopupHandler={() => {}} /> */}
        </>
    );
};

export default Home;
