"use client";
import { faCirclePlus, faEye, faLock, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [toggleChecked, setToggleChecked] = useState(() => Array(7).fill(false));
  const [isChecked, setIsChecked] = useState(() => {
    return Array.from({ length: 7 }, () => Array(5).fill(false));
  });

  const handleRowToggle = (rowIndex: number) => {
    const updatedToggleState = [...toggleChecked];
    updatedToggleState[rowIndex] = !toggleChecked[rowIndex];
    setToggleChecked(updatedToggleState);
  };

  const handleToggleClick = (rowIndex: number, colIndex: number) => {
    if (toggleChecked[rowIndex]) {
      const updatedCheckedState = [...isChecked];
      updatedCheckedState[rowIndex][colIndex] = !isChecked[rowIndex][colIndex];
      setIsChecked(updatedCheckedState);
    }
  };

  const handleToggleAll = () => {
    const allUnchecked = !toggleChecked.every(row => row);
    setToggleChecked(Array(7).fill(allUnchecked));
    if (allUnchecked) {
      setIsChecked(Array.from({ length: 7 }, () => Array(5).fill(false)));
    }
  };  

  useEffect(() => {
    isChecked.forEach((row, index) => {
      const permissions = ['All', 'Read', 'Write', 'Create', 'Delete'];
      const permissionsString = permissions.map((permission, i) => `${permission}: ${isChecked[index][i]}`).join(', ');
      console.log(`${String.fromCharCode(65 + index)} -> ${permissionsString}`);
    });
  }, [isChecked]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="grid grid-cols-0 gap-2 w-3/4">
      <div className="grid grid-cols-5 gap-4 mb-4">
          <label htmlFor="check-all" className="flex items-center font-bold">
            <input type="checkbox" id="check-all" checked={toggleChecked.every(row => row)} onChange={handleToggleAll} />
            <span>Toggle All</span>
          </label>
          <h1 className='font-bold absolute top-6 left-[330px]'>Active Permissions</h1>
          <FontAwesomeIcon icon={faLock} className="text-gray-600 font-bold absolute top-7 left-[866px]" />
          <h1 className='font-bold absolute top-6 left-[885px]'>All</h1>
          <FontAwesomeIcon icon={faEye} className="text-gray-600 font-bold absolute top-7 left-[945px]"/>
          <h1 className='font-bold absolute top-6 left-[965px]'>Read</h1>
          <FontAwesomeIcon icon={faPen} className="text-gray-600 font-bold absolute top-7 left-[1040px]"/>
          <h1 className='font-bold absolute top-6 left-[1060px]'>Write</h1>
          <FontAwesomeIcon icon={faCirclePlus} className="text-gray-600 font-bold absolute top-7 left-[1132px]"/>
          <h1 className='font-bold absolute top-6 left-[1150px]'>Create</h1>
          <FontAwesomeIcon icon={faTrash} className="text-gray-600 font-bold absolute top-7 left-[1225px]"/>
          <h1 className='font-bold absolute top-6 left-[1240px]'>Delete</h1>
        </div>
        {Array.from(Array(7), (_, rowIndex) => (
          <div key={rowIndex} className="bg-gray-200 rounded-md p-4 text-center border border-gray-400 relative" style={{ height: '80px' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label htmlFor={`check-all-${rowIndex}`} className="flex bg-gray-500 cursor-pointer relative left-[10px] top-[-20px] w-10 h-5 rounded-full">
                  <input
                    type="checkbox"
                    id={`check-all-${rowIndex}`}
                    className="sr-only peer"
                    checked={toggleChecked[rowIndex]}
                    onChange={() => handleRowToggle(rowIndex)}
                  />
                  <span className={`w-2/5 h-4/5 bg-gray-300 absolute rounded-full left-1 top-1 peer checked:bg-gray-600 peer-checked:left-5 transition-all duration-500 ${toggleChecked[rowIndex] ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                </label>
                <h1>{String.fromCharCode(65 + rowIndex)}</h1>
              </div>
              <div className="flex items-center space-x-20 relative top-[-20px] left-[-20px] p-8">
              {Array.from(Array(5), (_, colIndex) => (
                <label key={colIndex} className={`switch ${!toggleChecked[rowIndex] ? 'disabled' : ''}`}>
                    <input
                    type="checkbox"
                    id={`check-${rowIndex}-${colIndex}`}
                    checked={isChecked[rowIndex][colIndex]}
                    onChange={() => handleToggleClick(rowIndex, colIndex)}
                    disabled={!toggleChecked[rowIndex]}
                    />
                  <span className={`slider ${isChecked[rowIndex][colIndex] ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                </label>
              ))}
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Page;
