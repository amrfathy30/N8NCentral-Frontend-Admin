interface TitleProps {
    text: string;
}

export default function Title({ text }: TitleProps) {
    return (
        <div className="text-main text-[37px] font-medium  border-r-4 rounded-[4px] border-main px-2">
            <h2>{text}</h2>
        </div>
    );
}
