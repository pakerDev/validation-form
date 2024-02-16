import { IMainData } from "../container/Form";

const ToDoItem = ({ data }: { data: IMainData }) => {
    return (
        <div className='todoItemContainer'>
            {data.isTemplate === false &&
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
                })}
        </div>
    );
};

export default ToDoItem;
