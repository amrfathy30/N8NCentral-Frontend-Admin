interface HeaderProps {
    title: string;
    description?: string;
}

export default function Header({ title, description }: HeaderProps) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-[32px] font-bold text-[#101828]">{title}</h2>
            <p className="text-[#4A5565] text-[18px]">{description}</p>
        </div>
    );
}
