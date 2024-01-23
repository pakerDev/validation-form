import FormItem from "../components/FormItem.tsx";

export interface IBaseInfoObj {
    createTime: number;
    content: string;
}

export interface IFormItemProps {
    label: string;
    limit: number;
    info: IBaseInfoObj[];
}

export const data: IFormItemProps[] = [
    {
        label: "Title",
        limit: 1,
        info: [],
    },
    {
        label: "SubTitle",
        limit: 3,
        info: [],
    },
    {
        label: "Description",
        limit: 5,
        info: [],
    },
];

const Form = () => {
    return (
        <>
            {data.map((item) => (
                <FormItem key={item.label} label={item.label} limit={item.limit} info={item.info} />
            ))}
            <button type='submit'>submit</button>
        </>
    );
};

export default Form;
