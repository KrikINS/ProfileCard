import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>

            {/* Abstract Shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="z-10 text-center space-y-8 max-w-md w-full">
                {/* Logo Placeholder */}
                <div className="relative group cursor-default">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-black ring-1 ring-gray-900 rounded-lg p-8">
                        <h1 className="text-6xl font-black text-white tracking-tighter">
                            Krik<span className="text-blue-500">INS</span>
                        </h1>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome</h2>
                    <p className="text-gray-400 text-lg">
                        Create professional employee identification cards in seconds.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/generator')}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] shadow-xl"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                    Generate Profile Card
                </button>
            </div>

            <div className="absolute bottom-6 text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} KrikINS. All rights reserved.
            </div>
        </div>
    );
}
