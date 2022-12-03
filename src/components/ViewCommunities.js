function ViewCommunities() {
    return(
        <div className="overflow-x-auto  flex justify-center mt-20">
            <table className="table w-[90%]">
                <thead>
                <tr>
                    <th></th>
                    <th>Community Name</th>
                    <th>Members</th>
                    <th>Tags</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Tags</td>
                    <td>Blue</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Tags</td>
                    <td>Purple</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Tags</td>
                    <td>Red</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ViewCommunities;