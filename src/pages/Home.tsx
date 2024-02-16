import CustomSearch from "../components/CustomSearch";
import CustomDropDown from "../components/CustomDropDown";
import { useEffect, useState } from "react";
import { mainData } from "../constant/configs";
import CustomPreview from "../components/CustomPreview";
import CustomPreviewPro from "../components/CustomPreviewPro";
import { IMainData, ISearchInfo, allTagsType } from "../constant/types";
import Studio from "../components/CustomStudioContainer";
import CustomNav from "../components/CustomNav";
import { fetchData } from "../constant/main";
import CustomEditorModal from "../container/CustomEditorModal";
import VideoPage from "../pages/VideoPage";

const Home = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [savedDataJson, setSavedDataJson] = useState(JSON.parse(localStorage.getItem("mainData") ?? ""));
    const [isCardMode, setIsCardMode] = useState(true);
    const [isHomePage, setIsHomePage] = useState(true);
    const [isUpload, setIsUpload] = useState(false);
    const [isVideoPage, setIsVideoPage] = useState(false);
    const [isVideoData, setIsVideoData] = useState(savedDataJson[0]);
    const [category, setCategory] = useState<allTagsType>("all");
    const [searchInfo, setSearchInfo] = useState<ISearchInfo>({ by: "title", keyWord: "" });

    const dropDownHandler = (mode: string) => {
        if (mode === "cardMode") {
            setIsCardMode((i) => !i);
        }
        if (mode === "studio") {
            setIsHomePage((i) => !i);
            setSavedDataJson(fetchData().filter((i: IMainData) => i.isUploaded === true));
        }
        if (mode === "upload") {
            setIsUpload(true);
        }
        if (mode === "video") {
            setIsVideoPage((i) => !i);
        }
    };

    const navClickHandler = (cate: allTagsType) => {
        setCategory(cate);
    };

    const searchBarHandler = ({ by, keyWord }: ISearchInfo) => {
        setIsVideoPage(false);
        setSearchInfo({ by: by, keyWord: keyWord });
    };

    useEffect(() => {
        const allUploadedData = fetchData().filter((i: IMainData) => i.isUploaded === true);

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

    const closePopupHandler = () => {
        setIsUpload(false);
        setSavedDataJson(fetchData());
    };

    const videoPlayHandler = (info) => {
        setIsVideoPage(true);
        setIsVideoData(info);
    };

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
                {isVideoPage ? (
                    <VideoPage data={isVideoData} />
                ) : (
                    <>
                        {isHomePage ? (
                            <>
                                {savedDataJson.map((data: IMainData) => {
                                    return isCardMode ? (
                                        <CustomPreview
                                            key={data.videoURL}
                                            data={data}
                                            homeToVideo={(info) => videoPlayHandler(info)}
                                        />
                                    ) : (
                                        <CustomPreviewPro key={data.videoURL} data={data} />
                                    );
                                })}
                            </>
                        ) : (
                            <Studio />
                        )}
                    </>
                )}
            </div>

            {isUpload && <CustomEditorModal type='UPLOAD' closePopupHandler={closePopupHandler} />}
        </>
    );
};

export default Home;
