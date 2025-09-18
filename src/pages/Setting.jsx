import { FaArrowLeft, FaGlobe, FaPhone, FaShieldAlt, FaQrcode } from "react-icons/fa";
import { MdInfo, MdDirectionsBus } from "react-icons/md";
import { Link } from "react-router-dom";


const Setting = () => {
    return (
        <div className="w-full h-screen flex flex-col bg-white">
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

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button onClick={() => document.getElementById('my_modal_1').showModal()}>➔</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg py-4">Name</h3>
                                <input type="text" placeholder="Enter your name" className=' w-full 4 p-2 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400 ' />
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Set</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Gender</span>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button onClick={() => document.getElementById('my_modal_2').showModal()}>➔</button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg py-4">Gender</h3>
                                <select className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 text-gray-700'
                                >
                                    <option value="" disabled>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">set</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Email</span>
                        <button onClick={() => document.getElementById('my_modal_3').showModal()}>➔</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg py-4">Email</h3>
                                <input type="email" placeholder="Enter your Email" className=' w-full 4 p-2 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400 ' />
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Set</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span>Phone number</span>
                        <span className="text-gray-600">8076152254</span>
                    </div>
                </div>

                {/* Others */}
                <h2 className="text-blue-600 font-medium mt-6 mb-2">Others</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <FaGlobe className="text-blue-600" />
                        <span>Change language</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MdInfo className="text-blue-600" />
                        <span>About Us</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhone className="text-blue-600" />
                        <span>Helplines</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaShieldAlt className="text-blue-600" />
                        <span>Privacy Policy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MdDirectionsBus className="text-blue-600" />
                        <span>Last mile bookings</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaQrcode className="text-blue-600" />
                        <span>Validate Pass/Ticket</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm py-3">
                App Version <br /> <span className="font-light">1.9.7</span>
            </div>
        </div>
    );
};

export default Setting;