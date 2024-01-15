function DonationStats(props) {
    return (
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
                </div>
            </div>
    )
}

export default DonationStats;
