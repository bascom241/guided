import React from 'react'
import { SettingsIcon, UserIcon, LockIcon, MailIcon, BellIcon, CreditCardIcon } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState('account')
  
  const tabs = [
    { id: 'account', label: 'Account', icon: <UserIcon size={18} /> },
    { id: 'security', label: 'Security', icon: <LockIcon size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCardIcon size={18} /> }
  ]

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <SettingsIcon size={24} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${activeTab === tab.id 
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Account Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="email" 
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="john@example.com"
                        />
                        <button className="px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">Password</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Last changed 3 months ago</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Change Password
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Add an extra layer of security to your account</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Push Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Billing Information</h2>
                  
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Current Plan</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Premium Membership</p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                        Upgrade Plan
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</h4>
                        <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded-md border border-gray-200 dark:border-gray-600">
                          <CreditCardIcon size={20} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-800 dark:text-white">Visa ending in 4242</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Billing Address</h4>
                        <div className="p-3 bg-white dark:bg-gray-600 rounded-md border border-gray-200 dark:border-gray-600">
                          <p className="text-gray-800 dark:text-white">123 Main St, Apt 4B</p>
                          <p className="text-gray-800 dark:text-white">New York, NY 10001</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings