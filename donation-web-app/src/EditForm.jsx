import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function EditForm(props) {
    let subtitle;
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        setName(props.editData.name);
        if (props.editType === 2) {
            setType("2");
            setQuantity(props.editData.quantity);
        } else if (props.editType === 1) {
            setType("1");
            setAmount(props.editData.amount);
        } else {
            setType("3");
            setQuantity(props.editData.quantity);
        }
        setDate(props.editData.date);
    }, [props.modalIsOpen]);

    function openModal() {
      props.setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.

    }

    function closeModal() {
      props.setIsOpen(false);
    }

     // this would normally be an api call to the backend to save the data
     function handleEdit(e) {
        e.preventDefault();
        // use dict to save data
        let data = {};
        data.name = name;
        data.date = date;
        data.index = props.editData.index;
        // edit money donation
        if (props.editType === 1) {
            data.amount = amount;
            let arrayIndex = null;
            // search array to find the index of the data in the array
            for (let i = 0; i < props.moneyData.length; i++) {
                if (props.moneyData[i].index === props.editData.index) {
                    arrayIndex = i;
                }
            }
            let copyMoneyData = Array.from(props.moneyData);
            // replace index with new data
            copyMoneyData[arrayIndex] = data;
            props.setMoneyData(copyMoneyData);
        }
        // food donation
        else if (props.editType === 2) {
            data.quantity = quantity;
            let arrayIndex = null;
            // search array to find the index of the data in the array
            for (let i = 0; i < props.foodData.length; i++) {
                if (props.foodData[i].index === props.editData.index) {
                    arrayIndex = i;
                }
            }
            let copyfoodData = Array.from(props.foodData);
            copyfoodData[arrayIndex] = data;
            props.setFoodData(copyfoodData);
        }
        // clothing donation
        else {
            data.quantity = quantity;
            let arrayIndex = null;
            // search array to find the index of the data in the array
            for (let i = 0; i < props.clothingData.length; i++) {
                if (props.clothingData[i].index === props.editData.index) {
                    arrayIndex = i;
                }
            }
            let copyClothingData = Array.from(props.clothingData);
            copyClothingData[arrayIndex] = data;
            props.setClothingData(copyClothingData);
        }
        // reset all inputs
        setType("");
        setName("");
        setQuantity("");
        setAmount("");
        setDate("");
        // close edit form
        props.setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <form onSubmit={handleEdit} style={{minWidth: "700px", padding: "30px"}}>
                    <h2>Edit Donation</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input value={name || ''} onChange={event => setName(event.target.value)} type="text" className="form-control" id="name" aria-describedby="name" required/>
                    </div>
                    <div className="mb-3">
                        <select value={type || ''} onChange={event => setType(event.target.value)} className="form-select" aria-label="Default select example" required>
                            <option value="">Select type of donation</option>
                            <option value="1">Money</option>
                            <option value="2">Food</option>
                            <option value="3">Clothing</option>
                        </select>
                    </div>
                    {type === "1" ? (<div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input value={amount || ''} onChange={event => setAmount(event.target.value)} type="number" className="form-control" aria-label="Amount (to the nearest dollar)" required/>
                        <span className="input-group-text">.00</span>
                    </div>) : null}
                    {type === "2" || type === "3" ? (<div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input value={quantity || ''} onChange={event => setQuantity(event.target.value)} type="number" className="form-control" id="quantity" required/>
                    </div>) : null}
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input value={date || ''} onChange={event => setDate(event.target.value)} type="date" className="form-control" id="date" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Edit</button>
                    <button className="btn btn-secondary" onClick={closeModal}>close</button>
                </form>
            </Modal>
        </div>
    )
}

export default EditForm;
