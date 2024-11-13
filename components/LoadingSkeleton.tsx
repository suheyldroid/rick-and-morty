export function CharacterDetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] py-8">
            <div className="container mx-auto px-4">
                <div className="h-10 w-32 bg-gray-700 rounded-lg mb-6 animate-pulse" />
                
                <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="relative h-96 md:w-96 bg-gray-700 animate-pulse" />
                        <div className="p-6 flex-1 space-y-4">
                            <div className="h-8 w-2/3 bg-gray-700 rounded animate-pulse" />
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-6 bg-gray-700 rounded animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8">
                    <div className="h-8 w-1/4 bg-gray-700 rounded mb-4 animate-pulse" />
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-700 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 