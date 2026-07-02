import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Search,
    Users,
    BarChart3,
    Settings,
    BrainCircuit
} from "lucide-react";

const menu = [

    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/"
    },

    {
        title: "Search",
        icon: Search,
        path: "/search"
    },

    {
        title: "Candidates",
        icon: Users,
        path: "/candidates"
    },

    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics"
    },

    {
        title: "Settings",
        icon: Settings,
        path: "/settings"
    }

];

export default function Sidebar() {

    return (

        <aside className="w-72 border-r border-white/10 bg-[#0B1629]">

            <div className="flex items-center gap-3 px-8 py-8">

                <BrainCircuit
                    size={34}
                    className="text-cyan-400"
                />

                <div>

                    <h1 className="text-2xl font-bold">
                        RankWise
                    </h1>

                    <p className="text-sm text-gray-400">
                        AI Recruiter
                    </p>

                </div>

            </div>

            <nav className="mt-6">

                {

                    menu.map(item => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.title}

                                to={item.path}

                                className={({ isActive }) =>
                                    `mx-4 mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition
                                    ${isActive
                                        ? "bg-cyan-500 text-white"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"}`
                                }

                            >

                                <Icon size={22} />

                                {item.title}

                            </NavLink>

                        );

                    })

                }

            </nav>

        </aside>

    );

}