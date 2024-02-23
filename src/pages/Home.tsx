import CustomSearch from "../components/CustomSearch";
import CustomDropDown from "../components/CustomDropDown";
import { useEffect, useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import { mainData } from "../constant/configs";
import CustomPreview from "../components/CustomPreview";
import CustomPreviewPro from "../components/CustomPreviewPro";
import { IMainData, ISearchInfo, allTagsType } from "../constant/types";
import CustomNav from "../components/CustomNav";
import { fetchData } from "../constant/main";
import CustomEditorModal from "../container/CustomEditorModal";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyResult from "./EmptyResult";

const Home = () => {
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [savedDataJson, setSavedDataJson] = useState(JSON.parse(localStorage.getItem("mainData") ?? ""));
    const [isCardMode, setIsCardMode] = useState(true);
    const [isUpload, setIsUpload] = useState(false);
    const [category, setCategory] = useState<allTagsType>("all");
    const [searchInfo, setSearchInfo] = useState<ISearchInfo>({ by: "title", keyWord: "" });

    const homeIconClickHandler = () => {
        setSavedDataJson(fetchData().filter((i: IMainData) => i.isUploaded === true));
        setCategory("all");
        setSearchInfo({ by: "title", keyWord: "" });
    };

    const dropDownHandler = (mode: string) => {
        if (mode === "cardMode") {
            setIsCardMode((i) => !i);
        }
        if (mode === "upload") {
            setIsUpload(true);
        }
    };

    const navClickHandler = (cate: allTagsType) => {
        setCategory(cate);
    };

    const searchBarHandler = ({ by, keyWord }: ISearchInfo) => {
        setSearchInfo({ by: by, keyWord: keyWord });
    };

    useEffect(() => {
        const allUploadedData = fetchData().filter((i: IMainData) => i.isUploaded === true);
        const keywords = searchInfo.keyWord.toLowerCase().split(" ");

        let filteredData;
        if (searchInfo.by === "desc") {
            if (searchInfo.keyWord === "") {
                filteredData = [...allUploadedData];
            } else {
                filteredData = allUploadedData.filter((item: IMainData) =>
                    item.desc.some((descItem) => keywords.every((keyword) => descItem.toLowerCase().includes(keyword)))
                );
            }
        } else {
            filteredData = allUploadedData.filter((item: IMainData) => {
                const dataTitle = item[searchInfo.by].toString().toLowerCase();
                return keywords.every((keyword) => dataTitle.includes(keyword));
            });
        }

        if (category === "all") {
            setSavedDataJson(filteredData);
        } else if (category === "bookmark") {
            const allLickedData = filteredData.filter((i: IMainData) => i.isLiked === true);
            setSavedDataJson(allLickedData);
        } else {
            const theTagData = filteredData.filter((i: IMainData) => i.tag.includes(category));
            setSavedDataJson(theTagData);
        }
    }, [category, searchInfo.by, searchInfo.keyWord]);

    const closePopupHandler = () => {
        setIsUpload(false);
        setSavedDataJson(fetchData());
    };

    return (
        <>
            <div className='row homeHead'>
                <Link to='/'>
                    <IconButton color='primary' onClick={homeIconClickHandler}>
                        <HouseIcon />
                    </IconButton>
                </Link>
                <CustomSearch homeSearch={({ by, keyWord }: ISearchInfo) => searchBarHandler({ by, keyWord })} />
                <CustomDropDown homeViewMode={(mode: string) => dropDownHandler(mode)} />
            </div>
            <div className='row homeNav'>
                <CustomNav homeNavStatus={(category: allTagsType) => navClickHandler(category)} status={category} />
            </div>
            <div className='viewContainer'>
                {savedDataJson.length === 0 && <EmptyResult />}
                {savedDataJson.length > 0 &&
                    savedDataJson.map((data: IMainData) => {
                        return isCardMode ? (
                            <CustomPreview key={data.videoURL} data={data} />
                        ) : (
                            <CustomPreviewPro key={data.videoURL} data={data} />
                        );
                    })}
            </div>

            {isUpload && <CustomEditorModal type='UPLOAD' closePopupHandler={closePopupHandler} />}
        </>
    );
};

export default Home;
