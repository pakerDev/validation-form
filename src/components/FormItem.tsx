import { useEffect, useState } from "react";
import { IMainData } from "../container/Form";

interface IProps {
    formSubmitInfo: (info: IInfo) => void;
    formIsMatchReg: (isMatch: boolean) => void;
    rerender: boolean;
    clear: boolean;
    isUseTemp: boolean;
    editData: number;
}

export type TLabel = "Title" | "SubTitle" | "Description";

interface IFormConfig {
    label: TLabel;
    limit: number;
    maxLength: number;
    reg: RegExp;
}

export interface ISubmitInfo {
    Title: number[];
    SubTitle: number[];
    Description: number[];
}
export interface IInfo {
    Title: string[];
    SubTitle: string[];
    Description: string[];
}

const titleReg = /[\w\u4e00-\u9fa5\s\,\:\.\(\)\-]/g;
const subReg = /[\w\u4e00-\u9fa5\s\,\:\.\(\)\-]/g;
const descReg = /[\w\u4e00-\u9fa5\u3001-\u3017\，\。\,\.\'\"\s]/g;

const formConfig: IFormConfig[] = [
    {
        label: "Title",
        limit: 1,
        maxLength: 15,
        reg: titleReg,
    },
    {
        label: "SubTitle",
        limit: 3,
        maxLength: 30,
        reg: subReg,
    },
    {
        label: "Description",
        limit: 5,
        maxLength: 60,
        reg: descReg,
    },
];

const initInfo = {
    Title: [""],
    SubTitle: [""],
    Description: [""],
};

const submitItemInit: ISubmitInfo = {
    Title: [0],

    SubTitle: [],
    Description: [],
};

const FormItem = (props: IProps) => {
    const { formSubmitInfo, formIsMatchReg, rerender, clear, isUseTemp, editData } = props;
    const [info, setInfo] = useState(initInfo);
    const [submitItem, setSubmitItem] = useState(submitItemInit);
    const [isOnComposition, setIsOnComposition] = useState(false);

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, label: TLabel, id: number) => {
        const isChecked = e.target.checked;
        const updatedSubmit = { ...submitItem };
        if (isChecked) {
            if (updatedSubmit[label].indexOf(id) > -1) return;
            updatedSubmit[label].push(id);
        } else {
            let a = updatedSubmit[label].indexOf(id);
            updatedSubmit[label].splice(a, 1);
        }
        setSubmitItem(updatedSubmit);
    };

    const btnPlusHandler = (limit: number, label: TLabel) => {
        if (info[label].length < limit) {
            setInfo({ ...info, [label]: [...info[label], ""] });
        }
    };

    const btnMinusHandler = (label: TLabel, n: number) => {
        if (info[label].length < 2) return;
        const updatedInfo = { ...info };
        updatedInfo[label].splice(n, 1);
        setInfo(updatedInfo);

        const boxes = document.getElementsByName(`${label}inp`) as NodeListOf<HTMLInputElement>;
        for (const [id, each] of updatedInfo[label].entries()) {
            boxes[id].value = each;
        }

        const updatedSub = { ...submitItem };
        let index = updatedSub[label].indexOf(n);
        if (index > -1) {
            updatedSub[label].splice(index, 1);
        }
        updatedSub[label] = updatedSub[label].map((i) => (i > n ? i - 1 : i));
        setSubmitItem(updatedSub);
    };

    const authLength = (val: string, max: number) => {
        let res = val;
        if (res.length >= max) {
            res = res.slice(0, max);
        }
        return res;
    };

    const authRex = (label: TLabel, id: number, reg: RegExp) => {
        let res = "";
        let val = info[label][id];
        const chk =
            val
                .match(reg)
                ?.filter((char) => char !== "_")
                .join("") ?? "";
        chk === val ? "" : (res = "半形英數中字");
        chk === val ? formIsMatchReg(true) : formIsMatchReg(false);
        return res;
    };

    const compositionHandler = (
        e: React.CompositionEvent<HTMLTextAreaElement> | React.CompositionEvent<HTMLInputElement>,
        label: TLabel,
        id: number,
        max: number
    ) => {
        const target = e.target as HTMLInputElement;
        const val = target.value;
        if (e.type === "compositionend") {
            setIsOnComposition(false);
            target.value = authLength(val, max);

            const updatedInfo = { ...info };
            updatedInfo[label].splice(id, 1, target.value);
            setInfo(updatedInfo);
        } else {
            setIsOnComposition(true);
        }
    };

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        label: TLabel,
        id: number,
        max: number
    ) => {
        if (isOnComposition) return;

        const val = e.target.value;
        e.target.value = authLength(val, max);

        const updatedInfo = { ...info };
        submitItem[label].indexOf(id);

        updatedInfo[label].splice(id, 1, e.target.value);
        setInfo(updatedInfo);
    };

    useEffect(() => {
        let newSubmit: IInfo = { Title: [""], SubTitle: [""], Description: [""] };

        for (const label in info) {
            newSubmit[label as TLabel] = submitItem[label as TLabel]
                .sort()
                .map((i: number) => info[label as TLabel][i])
                .filter((item: string) => item !== "");
        }
        formSubmitInfo(newSubmit);
    }, [info, submitItem]);

    useEffect(() => {
        if (editData < 0) {
            let updatedInfo = { ...info };
            for (const label in updatedInfo) {
                info[label as TLabel].length >= 2 &&
                    (updatedInfo[label as TLabel] = updatedInfo[label as TLabel].filter((item) => item !== ""));
            }
            setInfo(updatedInfo);

            const updatedSub = { Title: [0], SubTitle: [], Description: [] };
            setSubmitItem(updatedSub);
        } else {
            const updatedJson = JSON.parse(localStorage.getItem("mainData") ?? "");
            setInfo(updatedJson[editData].info);
        }
    }, [rerender, editData]);

    useEffect(() => {
        const savedDataJson = JSON.parse(localStorage.getItem("mainData") ?? "");
        const temp = savedDataJson.filter((i: IMainData) => i.isTemplate === true);
        const boxes = document.getElementsByClassName("FIInput") as HTMLCollectionOf<HTMLInputElement>;
        for (const each of boxes) {
            //處理值
            each.value = temp[0].info[each.name];
            setInfo(temp[0].info);

            //處理勾
            setSubmitItem({ Title: [0], SubTitle: [0], Description: [0] });
        }
    }, [isUseTemp]);

    useEffect(() => {
        const updatedInfo = { Title: [""], SubTitle: [""], Description: [""] };

        const boxes = document.getElementsByClassName("FIInput") as HTMLCollectionOf<HTMLInputElement>;
        for (const each of boxes) {
            each.value = "";
        }
        setInfo(updatedInfo);
        const updatedSub = { Title: [0], SubTitle: [], Description: [] };
        setSubmitItem(updatedSub);
    }, [clear]);

    return (
        <>
            {Object.entries(info).map(([label, info]) => {
                return formConfig.map((rule, indexRule) => {
                    return (
                        <div key={indexRule}>
                            {rule.label === label && (
                                <div className='FIContainer'>
                                    <p className='FITitle'>{label}</p>
                                    {info.map((each, indexEachInfo) => {
                                        return (
                                            <div key={`${label}${indexEachInfo}`} className='FIMain'>
                                                {label === rule.label && (
                                                    <div className='FIRow'>
                                                        <input
                                                            className='FIcheck myCheckBox'
                                                            type='checkbox'
                                                            onChange={(e) => checkHandler(e, label, indexEachInfo)}
                                                            checked={submitItem[label].indexOf(indexEachInfo) > -1}
                                                        />

                                                        {label === "Title" ? (
                                                            <input
                                                                value={each}
                                                                className='FIInput'
                                                                name={`${label}`}
                                                                placeholder={`${each}`}
                                                                onCompositionEnd={(e) =>
                                                                    compositionHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
                                                                onChange={(e) =>
                                                                    onChangeHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
                                                                type='text'
                                                            />
                                                        ) : (
                                                            <textarea
                                                                value={each}
                                                                className='FIInput'
                                                                name={`${label}`}
                                                                placeholder={`${each}`}
                                                                onCompositionEnd={(e) =>
                                                                    compositionHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
                                                                onChange={(e) =>
                                                                    onChangeHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                        <div className='FIInputCtrl'>
                                                            {info.length > 1 ? (
                                                                <button
                                                                    className='FIMinus FIBtn'
                                                                    onClick={() =>
                                                                        btnMinusHandler(label, indexEachInfo)
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                            ) : (
                                                                <button className='FIMinus FIBtn' disabled></button>
                                                            )}

                                                            <span className='FIWordCount'>
                                                                {`${each.length}/${rule.maxLength}`}
                                                            </span>
                                                        </div>
                                                        <span className='FIAlert FIRowAlert'>{`${authRex(
                                                            label,
                                                            indexEachInfo,
                                                            rule.reg
                                                        )}`}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    <div className='FIFooter'>
                                        <span className='FIAlert'>{""}</span>
                                        <div>
                                            {label !== "Title" ? (
                                                <button
                                                    className='FIBtn FIPlus'
                                                    onClick={() => btnPlusHandler(rule.limit, label)}
                                                    disabled={!(info.length < rule.limit)}
                                                >
                                                    +
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                });
            })}
        </>
    );
};

export default FormItem;
