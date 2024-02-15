import CustomBookmark from "../components/CustomBookmark";
import CustomPreviewPro from "../components/CustomPreviewPro";
import CustomSingleTag from "../components/CustomSingleTag";
import CustomVideo from "../components/CustomVideo";
import { IMainData, allTagsType } from "../constant/types";

const VideoPage = ({ data }: { data: IMainData }) => {
    const { videoURL, title, tag, desc } = data;
    const savedDataJson = JSON.parse(localStorage.getItem("mainData") ?? "[]");

    const hasCommonTags = (tags1: allTagsType[], tags2: allTagsType[]) => {
        return tags1.some((tag) => tags2.includes(tag));
    };

    const relatedVideos = savedDataJson.filter(
        (item: IMainData) => item.videoURL !== videoURL && hasCommonTags(item.tag, tag)
    );

    return (
        <div className='playerContainer row'>
            <div>
                <CustomVideo width={800} height={450} url={videoURL} />
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
                    {desc.map((i, index) => (
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
    );
};

export default VideoPage;
