import { FaArrowLeft, FaGlobe, FaPhone, FaShieldAlt, FaQrcode, FaTimes } from "react-icons/fa";
import { MdInfo, MdDirectionsBus } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

const Setting = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: ''
    });

    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (field) => {
        // Handle form submission here
        console.log(`Setting ${field}:`, formData[field]);
        closeModal();
    };

    return (
        <div className="w-full h-screen flex flex-col bg-white relative">
            {/* Header */}
            <div className="flex items-center bg-blue-600 text-white p-4">
                <Link to={"/"}><FaArrowLeft className="mr-4 cursor-pointer" /></Link>
                <h1 className="text-lg font-semibold">Settings</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
                {/* Basic Info */}
                <h2 className="text-blue-600 font-medium mb-2">Basic Information</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Name</span>
                        <button onClick={() => openModal('name')} className="text-gray-600 hover:text-blue-600 transition-colors">
                            ➔
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Gender</span>
                        <button onClick={() => openModal('gender')} className="text-gray-600 hover:text-blue-600 transition-colors">
                            ➔
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Email</span>
                        <button onClick={() => openModal('email')} className="text-gray-600 hover:text-blue-600 transition-colors">
                            ➔
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Phone number</span>
                        <span className="text-gray-600">8076152254</span>
                    </div>
                </div>

                {/* Others */}
                <h2 className="text-blue-600 font-medium mt-6 mb-2">Others</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <FaGlobe className="text-blue-600" />
                        <span>Change language</span>
                    </div>
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <MdInfo className="text-blue-600" />
                        <span>About Us</span>
                    </div>
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <FaPhone className="text-blue-600" />
                        <span>Helplines</span>
                    </div>
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <FaShieldAlt className="text-blue-600" />
                        <span>Privacy Policy</span>
                    </div>
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <MdDirectionsBus className="text-blue-600" />
                        <span>Last mile bookings</span>
                    </div>
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <FaQrcode className="text-blue-600" />
                        <span>Validate Pass/Ticket</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm py-3">
                App Version <br /> <span className="font-light">1.9.7</span>
            </div>

            {/* Custom Centered Modals */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Transparent backdrop to show settings page */}
                    <div 
                        className="absolute inset-0 bg-transparent" 
                        onClick={closeModal}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-4 animate-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                {activeModal === 'name' ? 'Name' : activeModal === 'gender' ? 'Gender' : 'Email'}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-6">
                            {activeModal === 'name' && (
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 transition-all" 
                                />
                            )}
                            
                            {activeModal === 'gender' && (
                                <select 
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 transition-all"
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            )}
                            
                            {activeModal === 'email' && (
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 transition-all" 
                                />
                            )}
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="flex gap-3 px-6 pb-6">
                            <button 
                                onClick={closeModal}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleSubmit(activeModal)}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Set
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setting;