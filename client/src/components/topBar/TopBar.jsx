import { Facebook, Instagram, Pinterest, Search, Twitter } from "@material-ui/icons"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topBar.css"

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleLogout = () =>{
        dispatch({type:"LOGOUT"})
    }
    return (
        <div className="top">
            <div className="topLeft">
                <Instagram className="topIcon" />
                <Twitter className="topIcon" />
                <Facebook className="topIcon" />
                <Pinterest className="topIcon" />
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
                    <li className="topListItem"><Link className="link" to="/">RESTORATION&BUILDS</Link></li>
                    <li className="topListItem"><Link className="link" to="/">CONTACT</Link></li>
                    <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
                    <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                        <Link to="/settings"><img className="topImg" src={PF+user.profilePic} alt="" /></Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
                            <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>
                        </ul>
                    )
                }

                <Search className="topSearchIcon" />
            </div>
        </div>
    )
}
