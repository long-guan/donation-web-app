import { useState } from 'react'

function Form(props) {
    // type is used to determine if the quantity input (food, clothing) or amount input (money) should be displayed
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    // this would normally be an api call to the backend to save the data
    function handleSubmit(e) {
        e.preventDefault();
        // use dict to save data
        let data = {};
        data.name = name;
        data.date = date;
        // money donation
        if (type === "1") {
            data.amount = amount;
            // add index to data. This is normally done by the database
            if (props.moneyData.length > 0) {
                // get the last data index and add 1
                data.index = props.moneyData[props.moneyData.length - 1].index + 1;
            } else {
                data.index = 1;
            }
            let copyMoneyData = Array.from(props.moneyData);
            copyMoneyData.push(data);
            props.setMoneyData(copyMoneyData);
        }
        // food donation
        else if (type === "2") {
            data.quantity = quantity;
            // add index to data. This is normally done by the database
            if (props.foodData.length > 0) {
                data.index = props.foodData[props.foodData.length - 1].index + 1;
            } else {
                data.index = 1;
            }
            let copyfoodData = Array.from(props.foodData);
            copyfoodData.push(data);
            props.setFoodData(copyfoodData);
        }
        // clothing donation
        else {
            data.quantity = quantity;
            // add index to data. This is normally done by the database
            if (props.foodData.length > 0) {
                data.index = props.clothingData[props.clothingData.length - 1].index + 1;
            } else {
                data.index = 1;
            }
            let copyClothingData = Array.from(props.clothingData);
            copyClothingData.push(data);
            props.setClothingData(copyClothingData);
        }
        console.log(data);
        // reset all inputs
        setType("");
        setName("");
        setQuantity("");
        setAmount("");
        setDate("");
    }

    // added required attribute for all inputs
    return (
        <form onSubmit={handleSubmit} className="border" style={{minWidth: "700px", padding: "30px"}}>
            <h2>Donation Form</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input value={name} onChange={event => setName(event.target.value)} type="text" className="form-control" id="name" aria-describedby="name" required/>
            </div>
            <div className="mb-3">
                <select value={type} onChange={event => setType(event.target.value)} className="form-select" aria-label="Default select example" required>
                    <option value="">Select type of donation</option>
                    <option value="1">Money</option>
                    <option value="2">Food</option>
                    <option value="3">Clothing</option>
                </select>
            </div>
            {type === "1" ? (<div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input value={amount} onChange={event => setAmount(event.target.value)} type="number" className="form-control" aria-label="Amount (to the nearest dollar)" required/>
                <span className="input-group-text">.00</span>
            </div>) : null}
            {type === "2" || type === "3" ? (<div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input value={quantity} onChange={event => setQuantity(event.target.value)} type="number" className="form-control" id="quantity" required/>
            </div>) : null}
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input value={date} onChange={event => setDate(event.target.value)} type="date" className="form-control" id="date" required/>
            </div>
            <button type="submit" className="btn btn-primary">Donate</button>
        </form>
    )
}

export default Form
