import "./sideBar.css"
import { Facebook, Instagram, Pinterest, Search, Twitter } from "@material-ui/icons"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    const [cats, setCats] = useState([]);
  
    useEffect(() => {
      const getCats = async () => {
        const res = await axios.get("/categories");
        setCats(res.data);
      };
      getCats();
    }, []);
    return (
      <div className="sideBar">
        <div className="sideBarItem">
          <span className="sideBarTitle">ABOUT US</span>
          <img
            src="https://images.unsplash.com/photo-1600793575654-910699b5e4d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt=""
          />
          <p>
          To develop greater appreciation for classic Japanese (JDM) vehicles within the collector communities as well as general public through greater accessibility, knowledge base, and events. To improve the access and supply of Japanese (JDM) vehicles within North America and to provide restoration services to the owners of classic Japanese vehicles.

JDM Legends was founded in 2009 by Eric Bizek and Trey Cobb, who is also the owner/founder of the aftermarket tuning company Cobb Tuning. Born out of our passion for classic JDM cars, our goal is to improve knowledge and accessibility to these wonder pieces of history and machinery and assist in the enlightenment of the collector market of the true values this vehicles possess.
          </p>
        </div>
        <div className="sideBarItem">
          <span className="sideBarTitle">CATEGORIES</span>
          <ul className="sideBarList">
            {cats.map((c) => (
              <Link to={`/?cat=${c.name}`} className="link">
              <li className="sideBarListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
        </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">FOLLOW US</span>
                <div className="sideBarSocial">
                    <Instagram className="sideBarIcon" />
                    <Twitter className="sideBarIcon" />
                    <Facebook className="sideBarIcon" />
                    <Pinterest className="sideBarIcon" />
                </div>
            </div>
        </div>
    )
}
