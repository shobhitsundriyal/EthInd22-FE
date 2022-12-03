import { useState } from "react";
import Layout from "../components/Layout";
import ViewCommunities from "../components/ViewCommunities";
import YourCommunities from "../components/YourCommunities";

function Communities() {

    const [activeTab, setActiveTab] = useState(0);
    function changeTab(e, tabActive) {
        e.preventDefault();
        setActiveTab(tabActive);
    }

    return(
        <Layout page="Communities">
            <div className="flex justify-center items-center">
                <div className="max-w-[80%] text-lg text-center">
                    <div className="tabs tabs-boxed">
                        <a className={`tab ${activeTab == 0 ? 'tab-active' : ''}`} onClick={(e) => changeTab(e, 0)}>View Communities</a> 
                        <a className={`tab ${activeTab == 1 ? 'tab-active' : ''}`} onClick={(e) => changeTab(e, 1)}>Your Communities</a> 
                    </div>
                </div>
            </div>
            { activeTab == 0 ? <ViewCommunities /> : <YourCommunities/> }
        </Layout>
    )
}

export default Communities;