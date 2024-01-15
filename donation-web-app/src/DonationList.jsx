import EditForm from "./EditForm";
import React, { useState } from "react";

function DonationList (props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    // used to save the data that is to be edited and passes it down to the EditForm
    const [editData, setEditData] = useState({});
    // used to track if type is 1 (money), 2 (food), 3 (clothing)
    const [editType, setEditType] = useState(1);

    function handleDelete(typeData, dataIndex, setTypeData) {
        let arrayIndex = null;
        // search array to find the index of the data in the array
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].index === dataIndex) {
                arrayIndex = i;
            }
        }
        // remove first index
        if (arrayIndex === 0) {
            let copyArr = Array.from(typeData);
            copyArr.shift();
            setTypeData(copyArr);
        }
        // remove last index
        else if (arrayIndex === typeData.length - 1) {
            let copyArr = Array.from(typeData);
            copyArr.pop();
            setTypeData(copyArr);
        }
        // use slice and concat to exclude the index
        else {
            let copyArr = typeData.slice(0, arrayIndex).concat(typeData.slice(arrayIndex + 1));
            setTypeData(copyArr);
        }
    }

    return (
        <div className="border" style={{minWidth: "700px", padding: "30px"}}>
            <h2>Donation List</h2>
            <div className="border mb-3" style={{padding: "10px"}}>
                <h4>Money Donations</h4>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.moneyData.map((data) => (
                                    <tr key={data.index}>
                                        <td>{data.name}</td>
                                        <td>${data.amount}</td>
                                        <td>{data.date}</td>
                                        <td><button
                                            onClick={() => {
                                                setIsOpen(true);
                                                setEditType(1);
                                                setEditData(data);
                                            }}
                                            className="btn btn-primary">Edit</button></td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    handleDelete(props.moneyData, data.index, props.setMoneyData)}} className="btn btn-danger">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div>
                        Total money donors: {props.moneyData.length}
                    </div>
                    <div>
                        Total money donated: ${props.moneyData.reduce((total, data) => total + parseInt(data.amount), 0)}
                    </div>
                    <div>
                        Donation Per Person: ${props.moneyData.reduce((total, data) => total + parseInt(data.amount), 0) / props.moneyData.length}
                    </div>
                </div>
            </div>
            <div className="border mb-3" style={{padding: "10px"}}>
                <h4>Food Donations</h4>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.foodData.map((data) => (
                                    <tr key={data.index}>
                                        <td>{data.name}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.date}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setEditType(2);
                                                    setEditData(data);
                                                }}
                                                className="btn btn-primary">Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    handleDelete(props.foodData, data.index, props.setFoodData)}} className="btn btn-danger">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div>
                        Total food donors: {props.foodData.length}
                    </div>
                    <div>
                        Total food quantity donated: {props.foodData.reduce((total, data) => total + parseInt(data.quantity), 0)}
                    </div>
                </div>
            </div>
            <div className="border mb-3" style={{padding: "10px"}}>
                <h4>Clothing Donations</h4>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.clothingData.map((data) => (
                                    <tr key={data.index}>
                                        <td>{data.name}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.date}</td>
                                        <td>
                                            <button onClick={() => {
                                                setIsOpen(true);
                                                setEditType(3);
                                                setEditData(data);
                                            }} className="btn btn-primary">Edit</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    handleDelete(props.clothingData, data.index, props.setClothingData)}} className="btn btn-danger">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div>
                        Total clothing donors: {props.clothingData.length}
                    </div>
                    <div>
                        Total clothing quantity donated: {props.clothingData.reduce((total, data) => total + parseInt(data.quantity), 0)}
                    </div>
                    <EditForm
                        moneyData={props.moneyData}
                        foodData={props.foodData}
                        clothingData={props.clothingData}
                        setMoneyData={props.setMoneyData}
                        setFoodData={props.setFoodData}
                        setClothingData={props.setClothingData}
                        modalIsOpen={modalIsOpen}
                        setIsOpen={setIsOpen}
                        editData={editData}
                        editType={editType}
                    />
                </div>
            </div>
        </div>
    )
}

export default DonationList;
