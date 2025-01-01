import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate('/login');
    };

    return (
        <nav className="bg-blue-500 text-white p-4 md:p-6 lg:p-8 h-[100px] pt-[25px]">
            <div className="max-w-full flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">E-commerce Sales Chatbot</h1>

                <div className="flex justify-between items-center w-full sm:w-auto">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="sm:hidden text-2xl text-white"
                    >
                        ☰
                    </button>

                    {/* Navigation Links */}
                    <div className={`flex-1 sm:flex justify-center items-center mr-4 md:mr-6 lg:mr-8 text-sm sm:text-base md:text-lg lg:text-xl ${isMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
                        <Link to="/" className="mx-2 sm:mx-4 md:mx-6 hover:bg-blue-700 px-3 py-2 rounded transition-all duration-200">Home</Link>
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="mx-2 sm:mx-4 md:mx-6 hover:bg-blue-700 px-3 py-2 rounded transition-all duration-200">Login</Link>
                                <Link to="/signup" className="mx-2 sm:mx-4 md:mx-6 hover:bg-blue-700 px-3 py-2 rounded transition-all duration-200">Signup</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/chat" className="mx-2 sm:mx-4 md:mx-6 hover:bg-blue-700 px-3 py-2 rounded transition-all duration-200">Chat</Link>
                                <div>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-none text-white px-4 py-2 border-none hover:bg-red-600 focus:outline-none transition duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
