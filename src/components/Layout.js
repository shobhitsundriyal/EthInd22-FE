import TopNavBar from "./TopNavBar";

function Layout(props) {
    return(
        <>
            <TopNavBar />
            { props.children }
        </>
    )
}

export default Layout;