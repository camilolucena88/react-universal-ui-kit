import React from "react"

interface NavbarLink {
    text: string
    url: string
}

interface NavbarProps {
    logo?: string
    links?: NavbarLink[]
    buttonText?: string
    buttonUrl?: string
}

const Navbar: React.FC<NavbarProps> = ({
                                           logo = "",
                                           links = [],
                                           buttonText = "Post a Job",
                                           buttonUrl = "/post-job",
                                       }) => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/Users/calu01/Public" className="text-xl font-bold text-blue-600">
                                {logo ? (
                                    <img src={logo} alt="Logo" className="h-6 w-6" />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="mercado-match h-6 w-6"
                                        focusable="false"
                                    >
                                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                                    </svg>
                                )}
                            </a>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Button */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <a
                            href={buttonUrl}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
