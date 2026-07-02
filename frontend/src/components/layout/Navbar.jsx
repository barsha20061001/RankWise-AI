export default function Navbar() {

    return (

        <header className="flex items-center justify-between border-b border-white/10 bg-[#09111F] px-8 py-6">

            <div>

                <h2 className="text-3xl font-bold">
                    Welcome 
                </h2>

                <p className="text-gray-400">
                    AI Powered Candidate Ranking Platform
                </p>

            </div>

            <div className="rounded-full bg-cyan-500 px-5 py-3 font-semibold">

                Recruiter

            </div>

        </header>

    );

}