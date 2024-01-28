import { useEffect, useState } from "react";
import { IFormItemProps, IBaseInfoObj } from "../container/Form";

interface IProps {
    formSet: (info: IBaseInfoObj[]) => void;
    item: IFormItemProps;
    canSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const formConfig = [
    {
        label: "Title",
        limit: 1,
        maxLength: 15,
    },
    {
        label: "SubTitle",
        limit: 3,
        maxLength: 30,
    },
    {
        label: "Description",
        limit: 5,
        maxLength: 60,
    },
];

const FormItem = (props: any) => {
    // const { item, formSet, canSubmit } = props;

    //console.log(formConfig.findIndex((i) => i.label === "Title"));
    // const [itemInfo, setItemInfo] = useState(info);
    // const [canAdd, setCanAdd] = useState(false);
    // const [canDelete, setCanDelete] = useState(false);
    // const [isOnComposition, setIsOnComposition] = useState(false);
    // const [alertType, setAlertType] = useState("");
    // const [count, setCount] = useState(0);
    // const [msg, setMsg] = useState("");

    const wordReg = /[\w\u4e00-\u9fa5\s]/g;

    const initData = {
        info: {
            Title: ["1"],
            SubTitle: ["22", "4444"],
            Description: ["333", "55555"],
        },
        createTime: 0,
        isCreateNew: true,
        isDone: false,
        isTemplate: false,
    };

    // const baseInfoObj: IBaseInfoObj = {
    //     createTime: 0,
    //     content: "",
    // };

    const btnPlusHandler = (limit: number) => {
        if (itemInfo.length < limit) {
            const newItem = { ...baseInfoObj, createTime: Date.now() };
            setItemInfo([...itemInfo, newItem]);
        }
    };

    // useEffect(() => {
    //     itemInfo.length < limit ? setCanAdd(true) : setCanAdd(false);
    //     itemInfo.length > 1 ? setCanDelete(true) : setCanDelete(false);
    //     itemInfo.length >= limit
    //         ? setAlertType((t) => (t.indexOf("Limit") > -1 ? t : (t += "Limit")))
    //         : setAlertType((t) => t.replace("Limit", ""));

    //     formSet([...itemInfo]);
    //     //}, [itemInfo]);
    // }, []);

    const btnMinusHandler = (n: number) => {
        if (itemInfo.length < 2) return;
        setItemInfo(itemInfo.filter((obj) => obj.createTime !== n));
        setAlertType((t) => t.replace("Limit", ""));
    };

    const auth = (val: string) => {
        let res = val;

        const chk =
            val
                .match(wordReg)
                ?.filter((char) => char !== "_")
                .join("") ?? "";
        chk === res
            ? setAlertType((t) => t.replace("Reg", ""))
            : setAlertType((t) => (t.indexOf("Reg") > -1 ? t : (t += "Reg")));

        if (res.length >= maxLength) {
            res = res.slice(0, maxLength);
        }
        setCount(res.length);
        return res;
    };

    const compositionHandler = (
        e: React.CompositionEvent<HTMLTextAreaElement> | React.CompositionEvent<HTMLInputElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const val = target.value;
        if (e.type === "compositionend") {
            setIsOnComposition(false);
            target.value = auth(val);
            updateInfo(e);
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
    ) => {
        const target = e.target as HTMLInputElement;
        const index = itemInfo.findIndex((obj) => obj.createTime === +target.placeholder);

        if (index !== -1) {
            const newItemInfo = [...itemInfo];
            newItemInfo[index] = {
                ...newItemInfo[index],
                content: auth(target.value),
            };
            setItemInfo(newItemInfo);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isOnComposition) return;
        const val = e.target.value;
        e.target.value = auth(val);
        updateInfo(e);
    };

    // useEffect(() => {
    //     count >= maxLength
    //         ? setAlertType((t) => (t.indexOf("Max") > -1 ? t : (t += "Max")))
    //         : setAlertType((t) => t.replace("Max", ""));
    // // }, [count]);
    // }, []);

    // useEffect(() => {
    //     alertType === "" && setMsg("");
    //     alertType.indexOf("Limit") > -1 && setMsg((m) => (m.indexOf("欄") > -1 ? m : (m = ` 至多${limit}欄`)));
    //     alertType.indexOf("Max") > -1 && setMsg((m) => (m.indexOf("字") > -1 ? m : (m = ` 至多${maxLength}字`)));
    //     alertType.indexOf("Reg") > -1 && setMsg((m) => (m.indexOf("限") > -1 ? m : (m = ` 限半形英數及中文`)));
    //     alertType.indexOf("Reg") > -1 ? canSubmit(false) : canSubmit(true);
    //     true;
    // // }, [alertType]);
    // }, []);

    return (
        <>
            {Object.entries(initData.info).map(([label, info]) => {
                return formConfig.map((rule, index) => {
                    return (
                        <>
                            {rule.label === label && (
                                <div key={index} className='FIContainer'>
                                    <p className='FITitle'>{label}</p>
                                    {info.map((each, index) => {
                                        return (
                                            <div key={index} className='FIMain'>
                                                {label === rule.label && (
                                                    <div className='FIRow'>
                                                        <input className='FIcheck' type='checkbox' name={label} />
                                                        {label === "Title" ? (
                                                            <input
                                                                className='FIInput'
                                                                placeholder={`${each}`}
                                                                onCompositionStart={compositionHandler}
                                                                onCompositionUpdate={compositionHandler}
                                                                onCompositionEnd={compositionHandler}
                                                                onChange={(e) => onChangeHandler(e)}
                                                                type='text'
                                                            />
                                                        ) : (
                                                            <textarea
                                                                className='FIInput'
                                                                placeholder={`${each}`}
                                                                onCompositionStart={compositionHandler}
                                                                onCompositionUpdate={compositionHandler}
                                                                onCompositionEnd={compositionHandler}
                                                                onChange={(e) => onChangeHandler(e)}
                                                            />
                                                        )}
                                                        <div className='FIInputCtrl'>
                                                            <button
                                                                className='FIMinus FIBtn'
                                                                onClick={() => btnMinusHandler(index)}
                                                            >
                                                                -
                                                            </button>

                                                            <span className='FIWordCount'>
                                                                {`${each.length}/${rule.maxLength}`}{" "}
                                                            </span>
                                                        </div>
                                                        <span className='FIAlert FIRowAlert'>{`reg`}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    <div className='FIFooter'>
                                        <span className='FIAlert'>{`msg`}</span>
                                        <div>
                                            <button className='FIBtn FIPlus' onClick={() => btnPlusHandler(rule.limit)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                });
            })}
        </>
    );
};

export default FormItem;
