import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";
import CustomBookmark from "./CustomBookmark";

interface ICustomPreviewPro {
    data: IMainData;
}

const CustomPreviewPro = (props: ICustomPreviewPro) => {
    const { data } = props;
    const { imgURL = "@/asset/imagePlaceholder.svg", title, tag, desc, isLiked } = data;

    return (
        <div className='customPreviewContainer column'>
            <CustomImage
                className='customPreviewProImage'
                url={imgURL}
                width={240}
                height={120}
                isYellow={tag.includes("yellow")}
            />
            <div className='column fullWidth'>
                <div className='customPreviewHead row'>
                    {<div className='customPreviewProTitle'>{title === "" ? "title" : title}</div>}
                    <CustomBookmark isChecked={isLiked} onClick={() => {}} />
                </div>

                <div className='row CustomPreviewTag'>
                    {tag.length !== 0 &&
                        tag.map((i: allTagsType) => {
                            return <CustomSingleTag type={i} key={i} iconSize={16} />;
                        })}
                </div>

                <div className='row customPreviewDesc'>
                    {/* {desc.map((i: string, idx: number) => {
                        return (
                            <>
                                {i !== "" && (
                                    <div className='customPreviewProDescText' key={idx}>
                                        {i}
                                    </div>
                                )}
                            </>
                        );
                    })} */}
                    {<div className='customPreviewDescText'>{desc[0]}</div>}
                </div>
            </div>
        </div>
    );
};

export default CustomPreviewPro;
