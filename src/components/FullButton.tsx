
interface propsType {
    text: string;
    LoginSubmit(): void;
    buttonState: boolean
};

const LongButton = ({ text, LoginSubmit, buttonState }: propsType) => {

    return (
        <div onClick={LoginSubmit} className={"w-f h-bh text-center leading-10" + (buttonState ? " bg-orange-500" : " bg-slate-200")}>
            <span className={buttonState ? " text-white" : ""} >{text}</span>
        </div>
    );
};

export default LongButton;
