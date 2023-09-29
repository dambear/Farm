// src/components/FarmerTable.js
import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { fetchFarmerData, deleteFarmerData, updateFarmerData} from '../../service/firebase/firebaseFunctions';

import UpdateFarmerModal from './UpdateFarmerModal'

function FarmerTable() {

    const [farmerData, setFarmerData] = useState([]);

    const [editingFarmer, setEditingFarmer] = useState(null);

    const [editedData, setEditedData] = useState({
        first_name: '',
        last_name: '',
        contact_number: '',
        age: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
        const data = await fetchFarmerData();
        setFarmerData(data);
    };

        fetchData();
    }, []);

    const handleDelete = async (farmer_id) => {
        try {
        // Call the handleDeleteFarmer function from firebaseFunctions.js
        await deleteFarmerData(farmer_id);
        
        // After deletion, you can fetch the updated data and update the state
        const updatedData = await fetchFarmerData();
        setFarmerData(updatedData);
        } catch (error) {
        console.error('Error deleting farmer: ', error);
        }
    };

    const handleEdit = (farmer) => {
        setEditingFarmer(farmer);
        setEditedData({
            farmer_id: farmer.farmer_id,
            first_name: farmer.first_name,
            last_name: farmer.last_name,
            contact_number: farmer.contact_number,
            age: farmer.age,
        });
    };

    

    const handleSave = async () => {
        try {
            if (editingFarmer) {
                console.log('Editing Farmer ID:', editingFarmer.farmer_id); // Check the value
    
                // Call the updateFarmerData function from firebaseFunctions.js
                await updateFarmerData(editingFarmer.farmer_id, editedData);
    
                // After updating, close the modal and fetch the updated data
                setEditingFarmer(null);
                const updatedData = await fetchFarmerData();
                setFarmerData(updatedData);
            }
        } catch (error) {
            console.error('Error updating farmer: ', error);
        }
    };

    


    const handleCloseModal = () => {
        setEditingFarmer(null);
    };

    return (
        <div className="p-4 ">
            <div className='flex justify-between'>
            <h2 className="text-xl font-semibold mb-4">Farmer Table</h2>
            <h2 className="text-xl font-semibold mb-4">Add Farmer Button</h2>
            </div>

            <div className='overflow-auto rounded-lg shadow'>

            {/*TABLE*/}
            <table className="min-w-full bg-white border border-gray-300">

            {/*TABLE HEADER*/}
            <thead className='bg-gray-50 border-b-2 gray-200'>
                <tr>
                    <th className="p-3 text-sm font-semi-bold tracking-wide text-left">ID</th>
                    <th className="p-3 text-sm font-semi-bold tracking-wide text-left">First Name</th>
                    <th className="p-3 text-sm font-semi-bold tracking-wide text-left">Last Name</th>
                    <th className="p-3 text-sm font-semi-bold tracking-wide text-left">Age</th>
                    <th className="p-3 text-sm font-semi-bold tracking-wide text-left">Contact Number</th>
                    <th className="p-3 text-sm font-semi-bold tracking-wide text-left">Actions</th> {/* Add Actions column */}
                </tr>
            </thead>

            {/*TABLE BODY*/}
            <tbody className='divide-y divide-gray-100'>
                {farmerData.map((farmer) => (
                    <tr key={farmer.farmer_id}>
                        <td className="p-3 text-sm font-bold text-blue-500 ">{farmer.farmer_id}</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{farmer.first_name}</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{farmer.last_name}</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{farmer.age}</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{farmer.contact_number}</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <button onClick={() => handleEdit(farmer)}><BsPencilSquare size='24' className='fill-yellow-500'/></button>
                            <button onClick={() => handleDelete(farmer.farmer_id)}><BsFillTrashFill size='24' className='fill-red-500'/></button>                      
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            </div>


            {editingFarmer && (
                <UpdateFarmerModal
                    farmer={editingFarmer}
                    editedData={editedData}
                    setEditedData={setEditedData}
                    handleSave={handleSave}
                    handleCloseModal={handleCloseModal}
                />
            )}


        </div>


        
);
}




export default FarmerTable;
