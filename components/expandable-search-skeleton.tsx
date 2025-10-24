import { Skeleton } from "./ui/skeleton"

const ExpandableSearchSkeleton = () => {
    return (
        <div className="relative">
            <div className="w-80 max-w-[90vw]">
                <div className="relative group">
                    {/* Placeholder for the search icon */}
                    <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full" />
                    {/* Placeholder for the input field */}
                    <Skeleton className="px-10 py-7 h-14 w-full rounded-2xl" />
                    {/* Placeholder for the clear search button/loader */}
                    <Skeleton className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default ExpandableSearchSkeleton