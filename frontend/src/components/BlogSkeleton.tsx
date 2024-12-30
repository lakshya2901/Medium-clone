
export function BlogSkeleton(){
    return (
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md animate-pulse">
            <div className="flex items-center">
                {/* Avatar skeleton */}
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                {/* Author name skeleton */}
                <div className="h-4 w-24 bg-gray-300 rounded ml-2"></div>
                {/* Circle separator */}
                <div className="h-1 w-1 bg-gray-300 rounded-full mx-2"></div>
                {/* Published date skeleton */}
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
            {/* Title skeleton */}
            <div className="h-6 w-3/4 bg-gray-300 rounded mt-4"></div>
            {/* Content preview skeleton */}
            <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>
            {/* Reading time skeleton */}
            <div className="h-4 w-20 bg-gray-300 rounded mt-4"></div>
        </div>
    );
};
