import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";

interface ICustomPreviewPro {
    data: IMainData;
}

const CustomPreviewPro = (props: ICustomPreviewPro) => {
    const { data } = props;
    const { imgURL = "@/asset/imagePlaceholder.svg", info } = data;

    return (
        <div className='CustomPreviewProContainer row'>
            <CustomImage
                className='CustomPreviewProImage'
                url={imgURL}
                width={160}
                height={120}
                isYellow={data.info.tag.includes("yellow")}
            />
            <div className='column'>
                {info.title === "" ? "title" : info.title}
                <div className='row'>
                    {info.tag.length !== 0 &&
                        info.tag.map((i: allTagsType) => {
                            return <CustomSingleTag type={i} key={i} />;
                        })}
                </div>

                {info.desc.map((i: string, idx: number) => {
                    return <div key={idx}>{i}</div>;
                })}
            </div>
        </div>
    );
};

export default CustomPreviewPro;
