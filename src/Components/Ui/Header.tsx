interface HeaderProps {
    title: string;
    description?: string;
    titleClassName?: string;
}

export default function Header({ title, description, titleClassName }: HeaderProps) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className={`${titleClassName} text-[32px] font-bold text-[#101828]`}>{title}</h2>
            <p className="text-[#4A5565] text-[18px]">{description}</p>
        </div>
    );
}
