import FormItem from "../components/FormItem.tsx";

const Form = () => {
    const data = [
        {
            title: "Title",
            limit: 1,
        },
        {
            title: "SubTitle",
            limit: 3,
        },
        {
            title: "Description",
            limit: 5,
        },
    ];
    return (
        <>
            {data.map((item) => (
                <FormItem key={item.title} title={item.title} limit={item.limit} />
            ))}
        </>
    );
};

export default Form;
