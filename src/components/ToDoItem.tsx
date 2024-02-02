import { IMainData } from "../container/Form";

const ToDoItem = ({ data }: { data: IMainData[] }) => {
    console.log(typeof data);

    return (
        <div className='todoItemContainer'>
            {Object.entries(data).map(([index, each]) => {
                return (
                    each.isTemplate === false &&
                    Object.entries(each.info).map(([k, v]) => {
                        return (
                            <div key={k}>
                                <span>{k}: </span>
                                <span>
                                    {v.map((i: string, id: number) => {
                                        return <span key={id}> {i} </span>;
                                    })}
                                </span>
                            </div>
                        );
                    })
                );
            })}
            {/* {data.isTemplate === false &&
                Object.entries(data.info).map(([k, v]) => {
                    return (
                        <div key={k} className=''>
                            <span>{k}: </span>
                            <span>
                                {v.map((i: string, id: number) => {
                                    return <span key={id}> {i} </span>;
                                })}
                            </span>
                        </div>
                    );
                })} */}
        </div>
    );
};

export default ToDoItem;
