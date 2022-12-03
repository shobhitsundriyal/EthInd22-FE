function YourCommunities() {
    return(
        <div className="overflow-x-auto flex justify-center mt-20">
            <table className="table w-[90%]">
                <thead>
                <tr>
                    <th></th>
                    <th>Community Name</th>
                    <th>Members</th>
                    <th>Tags</th>
                    <th>Reputation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                    <td>Indian Medical Association</td>
                    <td>56</td>
                    <td>Biology</td>
                    <td>1</td>
                    <td><button className="btn btn-secondary m-20">Join</button></td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Indian Institute of Science Chemistry R&D</td>
                    <td>10</td>
                    <td>Chemistry</td>
                    <td>1</td>
                    <td><button className="btn btn-secondary m-20">Join</button></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Computer Science Education Society</td>
                    <td>45</td>
                    <td>Computer Science</td>
                    <td>1</td>
                    <td><button className="btn btn-secondary m-20">Join</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default YourCommunities;