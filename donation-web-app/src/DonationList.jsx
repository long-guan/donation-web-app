function DonationList (props) {


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
            <div>
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
                                        <td><button className="btn btn-primary">Edit</button></td>
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
                </div>
            </div>
        </div>
    )
}

export default DonationList;
