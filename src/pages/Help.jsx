import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Settings, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [activeTab, setActiveTab] = useState('FAQs');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqData = {
    General: [
      {
        key: 'booking-issue',
        question: 'Booking Related Issues',
        answer: 'For booking issues, please check your internet connection and ensure all required fields are filled correctly. If the problem persists, contact our support team.'
      },
      {
        key: 'payment-failed',
        question: 'Payment Failed',
        answer: 'If your payment failed, please check your account balance and try again. For recurring issues, contact your bank or try an alternative payment method.'
      },
      {
        key: 'app-crashes',
        question: 'App Crashes or Freezes',
        answer: 'Try clearing the app cache, updating to the latest version, or restarting your device. If issues persist, please report to our technical support.'
      }
    ],
    Journey: [
      {
        key: 'live-tracking',
        question: 'Live Bus Tracking Issues',
        answer: 'Ensure location services are enabled and you have a stable internet connection. GPS tracking may be affected in areas with poor network coverage.'
      },
      {
        key: 'seat-selection',
        question: 'Cannot Select Preferred Seat',
        answer: 'Some seats may already be booked or reserved. Try selecting alternative seats or check availability for different time slots.'
      },
      {
        key: 'route-changes',
        question: 'Route Changes or Diversions',
        answer: 'Route changes are communicated through app notifications. Enable push notifications to stay updated about any service modifications.'
      },
      {
        key: 'missed-bus',
        question: 'Missed My Bus',
        answer: 'If you missed your bus, check for the next available service or contact support for rebooking options. Some tickets may be transferable to the next journey.'
      }
    ],
    Payment: [
      {
        key: 'refund-policy',
        question: 'Refund Policy and Process',
        answer: 'Refunds are processed within 5-7 business days. Cancellation charges may apply based on the timing of cancellation. Check terms and conditions for detailed policy.'
      },
      {
        key: 'payment-methods',
        question: 'Accepted Payment Methods',
        answer: 'We accept UPI, credit/debit cards, net banking, and digital wallets. Choose your preferred payment method at checkout.'
      },
      {
        key: 'fare-calculation',
        question: 'How is Fare Calculated',
        answer: 'Fare is calculated based on distance, route, seat type, and current pricing. Dynamic pricing may apply during peak hours or high-demand periods.'
      }
    ],
    Account: [
      {
        key: 'login-issues',
        question: 'Cannot Login to Account',
        answer: 'Reset your password using the "Forgot Password" option. Ensure you are using the correct email/phone number registered with SmartYatra.'
      },
      {
        key: 'update-profile',
        question: 'Update Profile Information',
        answer: 'Go to Profile section in the app to update your personal details, contact information, and preferences. Some changes may require verification.'
      },
      {
        key: 'delete-account',
        question: 'Delete My Account',
        answer: 'Account deletion requests can be submitted through app settings or by contacting support. Please note that this action is irreversible.'
      }
    ]
  };

  const complaints = [
    'Driver behavior or misconduct',
    'Bus condition or cleanliness',
    'Delayed or cancelled service',
    'Overcharging or fare disputes',
    'Staff misbehavior',
    'Safety concerns',
    'Lost items in bus',
    'Technical app issues'
  ];

  const filteredFAQs = Object.entries(faqData).reduce((acc, [category, items]) => {
    const filtered = items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold">SmartYatra</div>
          </div>
          <Link to="/Setting">
          <Settings className="w-6 h-6" />
          </Link>
        </div>

        
        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {['FAQs', 'My Complaints'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === 'FAQs' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            
            {Object.entries(searchQuery ? filteredFAQs : faqData).map(([category, items]) => (
              <div key={category} className="bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-blue-600 p-4 border-b border-gray-100">
                  {category}
                </h3>
                
                {items.map((item) => (
                  <div key={item.key} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => toggleExpanded(item.key)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-800 font-medium pr-4">{item.question}</span>
                      <div className="bg-gray-600 rounded-full p-1 flex-shrink-0">
                        {expandedItems[item.key] ? (
                          <ChevronUp className="w-4 h-4 text-white" />
                        ) : (
                          <Plus className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </button>
                    
                    {expandedItems[item.key] && (
                      <div className="px-4 pb-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Quick Contact Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Call Support</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">Live Chat</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-700 font-medium">Email Us</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'My Complaints' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">File a Complaint</h2>
            
            <div className="bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-blue-600 p-4 border-b border-gray-100">
                Common Issues
              </h3>
              
              {complaints.map((complaint, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                    <span className="text-gray-800">{complaint}</span>
                    <div className="bg-gray-600 rounded-full p-1">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Complaints</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-600">Complaint #SY2024001</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                  </div>
                  <p className="text-gray-800">Bus was 30 minutes late</p>
                  <p className="text-xs text-gray-500 mt-2">Filed on: Jan 15, 2024</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-600">Complaint #SY2024002</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Resolved</span>
                  </div>
                  <p className="text-gray-800">Driver was rude to passengers</p>
                  <p className="text-xs text-gray-500 mt-2">Filed on: Jan 10, 2024</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Complaint Button */}
      <div className="p-4">
        <div className="text-center text-gray-600 mb-4">
          Can't find what you're looking for?
        </div>
        <button className="w-full bg-blue-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors">
          Raise New Complaint
        </button>
      </div>

      {/* Bottom Navigation */}
      

      {/* Footer */}
      
    </div>
  );
};

export default Help;