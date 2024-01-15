import { useState, useEffect } from "react"

function Filter(props) {
    const [name, setName] = useState("");
    // save all data that matches name
    const [queries, setQueries] = useState([]);

    function filterByName() {
        // search money donation for name match
        let newQuery = [];
        for (let i = 0; i < props.moneyData.length; i++) {
            console.log(props.moneyData[i].name)
            if (props.moneyData[i].name.includes(name)) {
                newQuery.push(props.moneyData[i]);
            }
        }
        // search food donation for name match
        for (let i = 0; i < props.foodData.length; i++) {
            if (props.foodData[i].name.includes(name)) {
                newQuery.push(props.foodData[i]);
            }
        }
        // search clothing donation for name match
        for (let i = 0; i < props.clothingData.length; i++) {
            if (props.clothingData[i].name.includes(name)) {
                newQuery.push(props.clothingData[i]);
            }
        }
        setQueries(newQuery);
    }

    useEffect(() => {
        // only filter when there is an input
        if (name.length > 0) {
            filterByName();
        } else {
            setQueries([])
        }
    }, [name])


    return (
        <div className="border" style={{minWidth: "700px", padding: "30px"}}>
            <h4>Filter by name</h4>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input value={name} onChange={event => setName(event.target.value)} type="text" className="form-control" id="name" aria-describedby="name" required/>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Amount/Quantity</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.length > 0 ? (
                            queries.map((data) => (
                                <tr key={data.index}>
                                    <td>{data.name}</td>
                                    {data.amount === undefined ?
                                        (<td>{data.money}</td>) :
                                        (<td>{data.amount}</td>)
                                    }
                                    <td>{data.date}</td>
                                </tr>
                            ))
                        ) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Filter;
