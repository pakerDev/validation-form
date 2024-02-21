import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";
import CustomBookmark from "./CustomBookmark";

interface ICustomPreview {
    data: IMainData;
    toVideo?: boolean;
}

const CustomPreview = (props: ICustomPreview) => {
    const { data, toVideo = true } = props;
    const { title, tag, desc } = data;

    return (
        <div className='customPreviewContainer column'>
            <CustomImage className='customPreviewProImage' width={240} height={120} data={data} toVideo={toVideo} />
            <div className='column fullWidth'>
                <div className='customPreviewHead row'>
                    {<div className='customPreviewProTitle'>{title === "" ? "title" : title}</div>}
                    <CustomBookmark code={data.videoURL} />
                </div>

                <div className='row CustomPreviewTag'>
                    {tag.length !== 0 &&
                        tag.map((i: allTagsType) => {
                            return <CustomSingleTag type={i} key={i} iconSize={16} />;
                        })}
                </div>

                <div className='row customPreviewDesc'>{<div className='customPreviewDescText'>{desc[0]}</div>}</div>
            </div>
        </div>
    );
};

export default CustomPreview;
