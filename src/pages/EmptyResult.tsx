import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const EmptyResult = () => {
    return (
        <div className='emptyResultContainer'>
            <ErrorOutlineIcon fontSize='large' color='error' />
            <p>尚無符合條件的影片</p>
        </div>
    );
};

export default EmptyResult;
