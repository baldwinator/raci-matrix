import React, { useState, useEffect } from 'react';
import RACIMatrix from './components/RACIMatrix';
import { RACIData } from './types/raci';
import { sampleData } from './data/sampleData';
import { secureLocalStorage } from './utils/security';

function App() {
  const [data, setData] = useState<RACIData>(sampleData);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = secureLocalStorage.getItem('raciData');
    if (savedData) {
      try {
        // Validate loaded data structure
        if (savedData.tasks && savedData.teamMembers && 
            Array.isArray(savedData.tasks) && Array.isArray(savedData.teamMembers)) {
          setData(savedData);
        } else {
          console.warn('Invalid data structure in storage, using sample data');
          setData(sampleData);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        setData(sampleData);
      }
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    secureLocalStorage.setItem('raciData', data);
  }, [data]);

  const handleUpdateData = (newData: RACIData) => {
    setData(newData);
  };

  return (
    <div className="App">
      <RACIMatrix data={data} onUpdateData={handleUpdateData} />
    </div>
  );
}

export default App;