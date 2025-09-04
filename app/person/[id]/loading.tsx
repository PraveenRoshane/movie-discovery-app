import { LoadingSpinner } from "@/components/loading-spinner"

export default function PersonLoading() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <LoadingSpinner />
                </div>
            </div>
        </div>
    )
}
