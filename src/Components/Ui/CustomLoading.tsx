import { Loader } from 'lucide-react';

export default function CustomLoading() {
    return (
        <div className="flex justify-center items-center py-20">
            <Loader className="w-12 h-12 animate-spin text-main" />
        </div>
    );
}
