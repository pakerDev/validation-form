import { IconButton } from "@mui/material";
import CustomBookmark from "../components/CustomBookmark";
import CustomPreviewPro from "../components/CustomPreviewPro";
import CustomSingleTag from "../components/CustomSingleTag";
import CustomVideo from "../components/CustomVideo";
import { fetchData, findData } from "../constant/main";
import HouseIcon from "@mui/icons-material/House";
import { IMainData, allTagsType } from "../constant/types";
import CustomDropDown from "../components/CustomDropDown";
import { useParams } from "react-router-dom";
import CustomEditorModal from "../container/CustomEditorModal";
import { Link } from "react-router-dom";
import { useState } from "react";

const VideoPage = () => {
    const params = useParams();
    const { data } = findData(params.code ?? "");
    const { videoURL, title, tag, desc } = data;
    const savedDataJson = fetchData();
    const [isUpload, setIsUpload] = useState(false);

    const dropDownHandler = (mode: string) => {
        if (mode === "upload") {
            setIsUpload(true);
        }
    };

    const closePopupHandler = () => {
        setIsUpload(false);
    };

    const hasCommonTags = (tags1: allTagsType[], tags2: allTagsType[]) => {
        return tags1.some((tag) => tags2.includes(tag));
    };

    const relatedVideos = savedDataJson.filter(
        (item: IMainData) => item.videoURL !== videoURL && hasCommonTags(item.tag, tag)
    );

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
            <div className='playerContainer row'>
                <div>
                    <CustomVideo width={480} height={270} url={videoURL} />
                    <div className='playerTitleRow row'>
                        <div className='playerTitle'>{title}</div>
                        <CustomBookmark code={videoURL} iconSize={24} />
                    </div>
                    <div className='row playerTag'>
                        {tag.map((i: allTagsType) => (
                            <CustomSingleTag type={i} key={i} iconSize={24} />
                        ))}
                    </div>
                    <div>
                        {desc.map((i: string, index: number) => (
                            <div className='playerDescText' key={index}>
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {"相關影片"}
                    {relatedVideos.map((item: IMainData, index: number) => (
                        <CustomPreviewPro data={item} key={index} />
                    ))}
                </div>
            </div>
            {isUpload && <CustomEditorModal type='UPLOAD' closePopupHandler={closePopupHandler} />}
        </>
    );
};

export default VideoPage;
