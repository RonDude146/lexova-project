import React, { useState } from 'react';
import { AdminDashboardLayout } from '../../components/Dashboard/AdminDashboardLayout';

const AdminVisualTools = () => {
  const [activeTab, setActiveTab] = useState('userFlow');
  
  // Sample data for user flow visualization
  const userFlowData = {
    nodes: [
      { id: 'landing', label: 'Landing Page', value: 100 },
      { id: 'signup', label: 'Sign Up', value: 75 },
      { id: 'profile', label: 'Create Profile', value: 60 },
      { id: 'case', label: 'Submit Case', value: 45 },
      { id: 'matching', label: 'Lawyer Matching', value: 40 },
      { id: 'payment', label: 'Payment', value: 35 },
      { id: 'review', label: 'Leave Review', value: 25 }
    ],
    links: [
      { source: 'landing', target: 'signup', value: 75 },
      { source: 'signup', target: 'profile', value: 60 },
      { source: 'profile', target: 'case', value: 45 },
      { source: 'case', target: 'matching', value: 40 },
      { source: 'matching', target: 'payment', value: 35 },
      { source: 'payment', target: 'review', value: 25 }
    ]
  };
  
  // Sample data for geographic distribution
  const geoData = [
    { state: 'California', clients: 1250, lawyers: 320 },
    { state: 'New York', clients: 980, lawyers: 280 },
    { state: 'Texas', clients: 850, lawyers: 210 },
    { state: 'Florida', clients: 720, lawyers: 180 },
    { state: 'Illinois', clients: 580, lawyers: 150 },
    { state: 'Pennsylvania', clients: 450, lawyers: 120 },
    { state: 'Ohio', clients: 380, lawyers: 95 },
    { state: 'Georgia', clients: 350, lawyers: 85 },
    { state: 'North Carolina', clients: 320, lawyers: 75 },
    { state: 'Michigan', clients: 290, lawyers: 70 }
  ];
  
  // Sample data for case type distribution
  const caseTypeData = [
    { type: 'Family Law', count: 850, color: '#3182CE' },
    { type: 'Corporate', count: 620, color: '#4299E1' },
    { type: 'Real Estate', count: 580, color: '#63B3ED' },
    { type: 'Criminal Defense', count: 450, color: '#90CDF4' },
    { type: 'Immigration', count: 380, color: '#BEE3F8' },
    { type: 'Intellectual Property', count: 320, color: '#EBF8FF' },
    { type: 'Personal Injury', count: 290, color: '#2B6CB0' },
    { type: 'Tax', count: 210, color: '#2C5282' },
    { type: 'Employment', count: 180, color: '#2A4365' },
    { type: 'Other', count: 120, color: '#718096' }
  ];
  
  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Visual Admin Tools</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Export Visualizations
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              Refresh Data
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('userFlow')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'userFlow'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Flow Visualization
            </button>
            <button
              onClick={() => setActiveTab('geoDistribution')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'geoDistribution'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Geographic Distribution
            </button>
            <button
              onClick={() => setActiveTab('caseTypes')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'caseTypes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Case Type Distribution
            </button>
          </nav>
        </div>
        
        {/* Content based on active tab */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {activeTab === 'userFlow' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">User Flow Visualization</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">User Path</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Drop-off</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  {userFlowData.nodes.map((node, index) => (
                    <div key={node.id} className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`}>
                        {Math.round(node.value)}%
                      </div>
                      <div className="text-center mt-2">
                        <div className="font-medium text-gray-800">{node.label}</div>
                        {index > 0 && (
                          <div className="text-sm text-red-500">
                            -{Math.round(userFlowData.nodes[index-1].value - node.value)}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="relative h-2 bg-gray-200 rounded-full mb-8">
                  <div className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <p>This visualization shows the user journey from landing page to final review. Each node represents a step in the process, with the percentage of users who reach that step.</p>
                  <p className="mt-2">The current conversion rate from landing to final review is <span className="font-bold text-blue-600">25%</span>.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 mb-2">Optimization Recommendations:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Improve the sign-up form to reduce the 25% drop-off from landing page</li>
                  <li>Simplify the profile creation process to improve completion rate</li>
                  <li>Add more guidance during the case submission step to reduce abandonment</li>
                  <li>Implement follow-up emails for users who drop off during the payment step</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'geoDistribution' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Geographic Distribution</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Clients</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Lawyers</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex mb-4">
                  <div className="w-1/3 text-center font-medium text-gray-800">State</div>
                  <div className="w-2/3 text-center font-medium text-gray-800">Distribution</div>
                </div>
                
                {geoData.map((item, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <div className="w-1/3">
                      <div className="font-medium text-gray-800">{item.state}</div>
                      <div className="text-sm text-gray-600">
                        <span className="text-blue-600">{item.clients}</span> clients, 
                        <span className="text-green-600 ml-1">{item.lawyers}</span> lawyers
                      </div>
                    </div>
                    <div className="w-2/3">
                      <div className="relative h-6 bg-gray-200 rounded-full">
                        <div 
                          className="absolute top-0 left-0 h-6 bg-blue-500 rounded-l-full" 
                          style={{ width: `${(item.clients / 1250) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-0 left-0 h-6 bg-green-500 rounded-l-full border-r-2 border-white" 
                          style={{ width: `${(item.lawyers / 320) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>This visualization shows the distribution of clients and lawyers across the top 10 states.</p>
                  <p className="mt-2">The current lawyer-to-client ratio is <span className="font-bold text-blue-600">1:4</span> (one lawyer for every four clients).</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 mb-2">Market Insights:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>California has the highest concentration of both clients and lawyers</li>
                  <li>Texas shows potential for lawyer recruitment with a higher client-to-lawyer ratio</li>
                  <li>Florida and Illinois are growing markets with increasing client acquisition</li>
                  <li>Consider targeted marketing in states with lower penetration</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'caseTypes' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Case Type Distribution</h2>
                <select className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="relative" style={{ height: '300px', width: '300px', margin: '0 auto' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-800">3,800</div>
                          <div className="text-sm text-gray-600">Total Cases</div>
                        </div>
                      </div>
                      {/* This would be a real chart in production */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {caseTypeData.map((item, index) => {
                          const total = caseTypeData.reduce((sum, i) => sum + i.count, 0);
                          const startAngle = index === 0 ? 0 : caseTypeData.slice(0, index).reduce((sum, i) => sum + (i.count / total) * 360, 0);
                          const endAngle = startAngle + (item.count / total) * 360;
                          
                          // Convert angles to radians and calculate coordinates
                          const startRad = (startAngle - 90) * Math.PI / 180;
                          const endRad = (endAngle - 90) * Math.PI / 180;
                          
                          const x1 = 50 + 40 * Math.cos(startRad);
                          const y1 = 50 + 40 * Math.sin(startRad);
                          const x2 = 50 + 40 * Math.cos(endRad);
                          const y2 = 50 + 40 * Math.sin(endRad);
                          
                          // Determine if the arc should be drawn as a large arc
                          const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                          
                          return (
                            <path 
                              key={index}
                              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                              fill={item.color}
                            />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-3">
                      {caseTypeData.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-800">{item.type}</span>
                              <span className="text-sm text-gray-600">{item.count} cases</span>
                            </div>
                            <div className="relative h-1.5 bg-gray-200 rounded-full mt-1">
                              <div 
                                className="absolute top-0 left-0 h-1.5 rounded-full" 
                                style={{ 
                                  backgroundColor: item.color,
                                  width: `${(item.count / 850) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-gray-600 mt-6">
                  <p>This visualization shows the distribution of cases by legal practice area.</p>
                  <p className="mt-2">Family Law, Corporate, and Real Estate are the top three practice areas, accounting for <span className="font-bold text-blue-600">54%</span> of all cases.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 mb-2">Business Recommendations:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Focus lawyer recruitment efforts on Family Law specialists to meet demand</li>
                  <li>Consider specialized marketing for underrepresented practice areas</li>
                  <li>Develop specialized resources for the top three practice areas</li>
                  <li>Monitor growth trends in Immigration and Intellectual Property cases</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminVisualTools;

