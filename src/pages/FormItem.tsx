import React from "react";

const FormItem = () => {
    return (
        <div>
            <h1 className='fititle'>title</h1>
            <div>
                <input className='fiinp' placeholder='ph' type='text' />
            </div>
            <button className='fibtn'>+</button>
        </div>
    );
};

export default FormItem;
