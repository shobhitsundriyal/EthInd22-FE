import { useState } from "react";
import Layout from "../components/Layout";

import ViewCommunities from "../components/ViewCommunities";
import YourCommunities from "../components/YourCommunities";

function Marketplace() {

    const [activeTab, setActiveTab] = useState(0);
    function changeTab(e, tabActive) {
        e.preventDefault();
        setActiveTab(tabActive);
    }

    return(
        <Layout page = "Marketplace">
            <div className="flex justify-center items-center">
                <div className="max-w-[80%] text-lg text-center">
                    <div className="tabs tabs-boxed">
                        <a className={`tab ${activeTab == 0 ? 'tab-active' : ''}`} onClick={(e) => changeTab(e, 0)}>View Listings</a> 
                        <a className={`tab ${activeTab == 1 ? 'tab-active' : ''}`} onClick={(e) => changeTab(e, 1)}>Your Listings</a> 
                        <a className={`tab ${activeTab == 2 ? 'tab-active' : ''}`} onClick={(e) => changeTab(e, 2)}>View Bids</a>
                        <a className={`tab ${activeTab == 3 ? 'tab-active' : ''}`} onClick={(e) => changeTab(e, 3)}>Your Bids</a> 
                    </div>
                </div>
            </div>
            { activeTab == 0 ? <ViewCommunities /> : activeTab == 1 ? <YourCommunities/> : activeTab == 2 ? <YourCommunities/> : <ViewCommunities /> }
        </Layout>
    )
}

export default Marketplace;