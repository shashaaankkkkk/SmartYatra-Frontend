import React, { useState } from 'react'
import passenger from "/Users/anamikaverma/SmartYatra-Frontend/src/assets/passengers.png"

const Tickets = () => {
    const [formData, setFormData] = useState({
        
        fullName: "",
        phone: "",
        birthDate: "",
        document: "Aadhar Card",
        docLast4: ""
      });
  return (
    <> <div>
    <img src={passenger} alt="passengers" className='  w-full opacity-90 md:opacity-70'/>
</div>
<div className='flex justify-around mt-4'>

<button className="relative bg-white shadow-md rounded-xl w-32 h-24 flex flex-col items-center justify-center" onClick={()=>document.getElementById('my_modal_1').showModal()}>
<div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full" />
          <span className="text-yellow-600 text-3xl">🎫</span>
          <p className="text-sm font-semibold mt-1">Bus Ticket</p>
</button>
<button className="relative bg-white shadow-md rounded-xl w-32 h-24 flex flex-col items-center justify-center" onClick={()=>document.getElementById('my_modal_2').showModal()}><div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full" />
          <span className="text-pink-600 text-3xl">🎟️</span>
          <p className="text-sm font-semibold mt-1">Bus Passes</p></button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg"></h3>
    <p className="py-4"></p>
    <div className="modal-action">
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Pass Details</h3>
    
    <form >
  <select className="select validator " required>
    <option disabled selected value="">Pass Type:</option>
    <option>DAILY ALL ROUTE NON AC PASS</option>
    <option>DAILY ALL ROUTE AC PASS</option>
    <option>MONTHLY GENERAL ALL ROUTE NON AC PASS</option>
    <option>MONTHLY GENERAL ALL ROUTE AC PASS</option>
    
  </select>
  <p className="validator-hint">Required</p>

<div>
<div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Pass Fare</p>
            <p className="text-blue-600 font-bold text-lg">₹800</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valid Till</p>
            <p className="font-semibold">23:59, 17/10/2025</p>
          </div>
        </div>
</div>
  
</form>
<div className="bg-white shadow rounded-xl p-4 mt-4">
        <h2 className="font-bold text-lg mb-2">Personal Details</h2>

        <label className="text-sm font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        <label className="text-sm font-medium">Phone Number</label>
        <input
          type="number"
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />

        <label className="text-sm font-medium">Birth Date</label>
        <input
          type="date"
          className="w-full border rounded-lg p-2 mb-3"
          value={formData.birthDate}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
        />

        <label className="text-sm font-medium">Verification Document</label>
        <div className="flex gap-2">
          <select
            className="flex-1 border rounded-lg p-2"
            value={formData.document}
            onChange={(e) =>
              setFormData({ ...formData, document: e.target.value })
            }
          >
            <option>Aadhar Card</option>
            <option>PAN Card</option>
            <option>Voter ID</option>
          </select>
          <input
            type="text"
            className="w-24 border rounded-lg p-2"
            placeholder="Last 4"
            value={formData.docLast4}
            onChange={(e) =>
              setFormData({ ...formData, docLast4: e.target.value })
            }
          />
        </div>
      </div>

      
    <div className="modal-action">
      <form method="dialog">

       
        <button className="btn w-full  bg-blue-600 text-white p-3 rounded-lg mt-6 font-semibold">Next Step</button>
      </form>
    </div>
  </div>
</dialog>
</div>
<div>
<div className=' min-h-screen p-4 space-y-6'>
<div >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-md font-semibold">My Bus Ticket</h2>
          <span className="text-gray-500 text-sm">View all tickets</span>
        </div>
        <div className="h-30 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-md font-semibold">My Bus Pass</h2>
          <span className="text-gray-500 text-sm">View all passes</span>
        </div>
        <div className="h-30 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600">
          Click to View
        </div>
      </div>
    
     
      
    </div>
</div>
</>
  
  )
}



export default Tickets