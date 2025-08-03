"use client"; // This directive must be at the very top
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Sidenav() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleOpenItem = (item: string) => {
        setIsOpen(false);
        console.log(`Navigating to ${item}`); // Placeholder for navigation logic
        // redirect(`/home/${item.toLowerCase()}`); // Example navigation, adjust as needed
        router.push(`/home/${item.toLowerCase()}`); // Use Next.js router to navigate
        /**
         * Difference between redirect and router.push:
         * - redirect: This is a server-side redirect that will change the URL and reload the page.
         * - router.push: This is a client-side navigation that updates the URL without reloading the page.
         * Use router.push for smoother transitions in a single-page application.
         * - Note: Ensure that the path exists in your Next.js routing structure.
         * - If you want to perform a server-side redirect, you can use `redirect`
         *   from 'next/navigation' as shown in the import statement.
         * - If you want to navigate without reloading the page, use `router.push`.
        */
    };

    return (
        <>
            <div className="flex p-4">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        )}
                    </svg>
                </button>
            </div>

            {isOpen && <div
                className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:h-auto md:shadow-none md:bg-transparent
        `}
            >
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu</h2>
                    <nav>
                        <ul>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                                    onClick={() => handleOpenItem('Dashboard')} // Close menu on item click (for mobile)
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                                    onClick={() => handleOpenItem('Products')} // Close menu on item click (for mobile)
                                >
                                    Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                                    onClick={() => handleOpenItem('Orders')} // Close menu on item click (for mobile)
                                >
                                    Orders
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                                    onClick={() => handleOpenItem('Invoice')} // Close menu on item click (for mobile)
                                >
                                    Invoices
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>}

        </>
    );
}

export default Sidenav;
