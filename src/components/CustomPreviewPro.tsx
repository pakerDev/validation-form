import { IMainData, allTagsType } from "../constant/types";
import CustomBookmark from "./CustomBookmark";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";

interface ICustomPreviewPro {
    data: IMainData;
    isClickable?: boolean;
}

const CustomPreviewPro = (props: ICustomPreviewPro) => {
    const { data, isClickable: isClickAble = true } = props;
    const { videoURL, title, tag, desc } = data;

    return (
        <div className='customPreviewProContainer row'>
            <CustomImage
                className='customPreviewProImage'
                width={240}
                height={120}
                data={data}
                isClickable={isClickAble}
            />
            <div className='column fullWidth customPreviewProRight'>
                <div className='customPreviewProTitleRow row'>
                    <div className='customPreviewProTitle'>{title === "" ? "title" : title}</div>
                    <CustomBookmark code={videoURL} iconSize={20} />
                </div>
                <div className='row customPreviewProTag'>
                    {tag.length !== 0 &&
                        tag.map((i: allTagsType) => {
                            return <CustomSingleTag type={i} key={i} iconSize={24} />;
                        })}
                </div>

                <div className='row customPreviewProDesc'>
                    {<div className='customPreviewProDescText'>{desc[0]}</div>}
                </div>
            </div>
        </div>
    );
};

export default CustomPreviewPro;
