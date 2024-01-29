import { useEffect, useState } from "react";
import { IFormItemProps, IBaseInfoObj } from "../container/Form";

interface IProps {
    formSet: (info: IBaseInfoObj[]) => void;
    item: IFormItemProps;
    canSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

type TLabel = "Title" | "SubTitle" | "Description";

interface IInitInfo {
    label: TLabel;
    limit: number;
    maxLength: number;
    reg: RegExp;
}

const titleReg = /[\w\u4e00-\u9fa5\s]/g;
const subReg = /[\w\u4e00-\u9fa5\s]/g;
const descReg = /[\w\u4e00-\u9fa5\u3001-\u3017\,\.\'\"s]/g;

const formConfig: IInitInfo[] = [
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

interface IsubmitInfo {
    Title: number[];
    SubTitle: number[];
    Description: number[];
}

const submitInit: IsubmitInfo = {
    Title: [],
    SubTitle: [],
    Description: [],
};

const FormItem = () => {
    const [info, setInfo] = useState(initInfo);
    const [submitInfo, setSubmitInfo] = useState(submitInit);
    const [isOnComposition, setIsOnComposition] = useState(false);

    const checkHandler = (e, label: TLabel, id: number) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const updatedSubmit = { ...submitInfo };
            if (updatedSubmit[label].indexOf(id) > -1) return;
            updatedSubmit[label].push(id);
            setSubmitInfo(updatedSubmit);
        } else {
            const updatedSubmit = { ...submitInfo };
            let a = updatedSubmit[label].indexOf(id);
            updatedSubmit[label].splice(a, 1);
            setSubmitInfo(updatedSubmit);
        }
    };

    const btnPlusHandler = (limit: number, label: TLabel) => {
        if (info[label].length < limit) {
            const updatedInfo = { ...info };
            updatedInfo[label].push("");
            setInfo(updatedInfo);
        }
    };

    const btnMinusHandler = (label: TLabel, n: number) => {
        if (info[label].length < 2) return;
        const updatedInfo = { ...info };
        updatedInfo[label].splice(n, 1);
        setInfo(updatedInfo);
    };

    const auth = (val: string, max: number) => {
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
        chk === val ? "" : (res = "reg");

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
            target.value = auth(val, max);
            const updatedInfo = { ...info };
            updatedInfo[label].splice(id, 1, target.value);
            setInfo(updatedInfo);
        } else {
            setIsOnComposition(true);
        }
    };

    const updateInfo = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.CompositionEvent<HTMLTextAreaElement>
            | React.CompositionEvent<HTMLInputElement>
    ) => {};

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        label: TLabel,
        id: number,
        max: number
    ) => {
        if (isOnComposition) return;

        const val = e.target.value;
        e.target.value = auth(val, max);
        const updatedInfo = { ...info };
        updatedInfo[label].splice(id, 1, e.target.value);
        setInfo(updatedInfo);
    };

    return (
        <>
            {Object.entries(info).map(([label, info]) => {
                return formConfig.map((rule, indexRule) => {
                    return (
                        <div key={`${indexRule}`}>
                            {rule.label === label && (
                                <div className='FIContainer'>
                                    <p className='FITitle'>{label}</p>
                                    {info.map((each, indexEachInfo) => {
                                        return (
                                            <div key={`${label}${indexEachInfo}`} className='FIMain'>
                                                {label === rule.label && (
                                                    <div className='FIRow'>
                                                        <input
                                                            className='FIcheck'
                                                            type='checkbox'
                                                            name={label}
                                                            onChange={(e) => checkHandler(e, label, indexEachInfo)}
                                                        />
                                                        {label === "Title" ? (
                                                            <input
                                                                className='FIInput'
                                                                placeholder={`${each}`}
                                                                onCompositionStart={(e) =>
                                                                    compositionHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
                                                                onCompositionUpdate={(e) =>
                                                                    compositionHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
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
                                                                className='FIInput'
                                                                placeholder={`${each}`}
                                                                onCompositionStart={(e) =>
                                                                    compositionHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
                                                                onCompositionUpdate={(e) =>
                                                                    compositionHandler(
                                                                        e,
                                                                        label,
                                                                        indexEachInfo,
                                                                        rule.maxLength
                                                                    )
                                                                }
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
