import React, { useState } from 'react';

const NavbarComponent = (props) => {

    const [toggle, setToggle] = useState({
        toggleDesktop:false,
        toggleMobile:false
    });
    const handleOnClickToggleDesktop = (event) => {
        setToggle({toggleDesktop:!toggle.toggleDesktop, toggleMobile:false});
    };
    const handleOnClickToggleMobile = (event) => {
        setToggle({toggleDesktop:false, toggleMobile:!toggle.toggleMobile});
    };

    return (
        <div>
        <nav className="bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    <p className="text-white text-xl">Pharmy-app</p>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-800 focus:outline-none focus:text-white focus:bg-blue-500">Dashboard</a>

                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>

                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Projects</a>

                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Calendar</a>

                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Reports</a>
                    </div>
                </div>
                </div>
                <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                    <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
                    </button>

                    <div className="ml-3 relative">
                    <div>
                        <button className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                        <p className="text-white" onClick={handleOnClickToggleDesktop}>FackingChrisjr@gmail.com</p>
                        </button>
                    </div>
                    {/*
                        Profile dropdown panel, show/hide based on dropdown state.

                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    */}
                    <div className={`${toggle.toggleDesktop ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}>
                        <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>

                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>

                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="-mr-2 flex md:hidden">

                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white" onClick={handleOnClickToggleMobile}>
        
                    <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
            </div>

            <div className="hidden md:hidden">
            <div className={`${toggle.toggleMobile ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1 sm:px-3`}>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Projects</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Calendar</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Reports</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 space-x-3">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="space-y-1">
                    <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                    <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your Profile</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Settings</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign out</a>
                </div>
            </div>
            </div>
        </nav>

        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Consultas
            </h1>
            </div>
        </header>
        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                {/* componentes hijos van aca */}
            </div>
            </div>
        </main>
        </div>
    );
}
export default NavbarComponent;