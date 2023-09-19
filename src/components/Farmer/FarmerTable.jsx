// src/components/FarmerTable.js
import React, { useEffect, useState } from 'react';
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
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Farmer Table</h2>
            <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Age</th>
                    <th className="py-2 px-4 border-b">Contact Number</th>
                    <th className="py-2 px-4 border-b">Actions</th> {/* Add Actions column */}
                </tr>
            </thead>
            <tbody>
                {farmerData.map((farmer) => (
                    <tr key={farmer.farmer_id}>
                        <td className="py-2 px-4 border-b">{farmer.farmer_id}</td>
                        <td className="py-2 px-4 border-b">{farmer.first_name}</td>
                        <td className="py-2 px-4 border-b">{farmer.last_name}</td>
                        <td className="py-2 px-4 border-b">{farmer.age}</td>
                        <td className="py-2 px-4 border-b">{farmer.contact_number}</td>
                        <td className="py-2 px-4 border-b">
                            <button onClick={() => handleEdit(farmer)}>Edit</button>
                            <button onClick={() => handleDelete(farmer.farmer_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>


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
