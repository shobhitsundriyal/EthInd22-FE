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
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Tags</td>
                    <th>234</th>
                    <td>Blue</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Tags</td>
                    <th>234</th>
                    <td>Purple</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Tags</td>
                    <th>234</th>
                    <td>Red</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default YourCommunities;