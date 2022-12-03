import TopNavBar from "./TopNavBar";

function Layout(props) {
    return(
        <>
            <TopNavBar page = { props.page }/>
            <div>{ props.children }</div>
        </>
    )
}

export default Layout;