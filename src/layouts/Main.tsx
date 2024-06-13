import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Header from "../components/Header";

function Main() {
   return( 
   <div className="App">
        <Header/>
        <Menu/>
        <div className="m-4">
            <Outlet />
        </div>
    </div>)
}
export default Main;
