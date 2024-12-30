import { Appbar } from "./Appbar";

export const FullBlogSkeleton = () => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl animate-pulse">
                    
                    <div className="col-span-8">
                        
                        <div className="h-12 w-3/4 bg-gray-300 rounded mb-4"></div>
                    
                        <div className="h-4 w-1/3 bg-gray-300 rounded mb-6"></div>
                       
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-gray-300 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                            <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                        </div>
                    </div>

                  
                    <div className="col-span-4">
                       
                        <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>
                        <div className="flex w-full">
                         
                            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                            <div className="flex flex-col">
                                
                                <div className="h-6 w-1/2 bg-gray-300 rounded mb-2"></div>
                                
                                <div className="h-4 w-full bg-gray-300 rounded"></div>
                                <div className="h-4 w-5/6 bg-gray-300 rounded mt-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
