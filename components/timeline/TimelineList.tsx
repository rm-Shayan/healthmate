import TimelineEvent from "./TimelineEvent";

interface TimelineListProps {
    items: any[];
}

export default function TimelineList({ items }: TimelineListProps) {
    return (
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-100 via-blue-200 to-transparent lg:-ml-[1px]"></div>

            <div className="space-y-16 relative">
                {items.map((item, index) => (
                    <TimelineEvent key={item._id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}
