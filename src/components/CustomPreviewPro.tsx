import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";

interface ICustomPreviewPro {
    data: IMainData;
}

const CustomPreviewPro = (props: ICustomPreviewPro) => {
    const { data } = props;
    const { imgURL = "@/asset/imagePlaceholder.svg", title, tag, desc } = data;

    return (
        <div className='customPreviewProContainer row'>
            <CustomImage
                className='customPreviewProImage'
                url={imgURL}
                width={160}
                height={80}
                isYellow={tag.includes("yellow")}
            />
            <div className='column fullWidth CustomPreviewProRight'>
                {<div className='customPreviewProTitle'>{title === "" ? "title" : title}</div>}
                <div className='row customPreviewProTag'>
                    {tag.length !== 0 &&
                        tag.map((i: allTagsType) => {
                            return <CustomSingleTag type={i} key={i} />;
                        })}
                </div>

                <div className='row CustomPreviewProDesc'>
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
                    {<div className='customPreviewProDescText'>{desc[0]}</div>}
                </div>
            </div>
        </div>
    );
};

export default CustomPreviewPro;
