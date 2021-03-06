import "./settings.css"
import SideBar from "../../components/sideBar/SideBar"
import { AccountCircle } from "@material-ui/icons"
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" }); /* ../context/Reducer.js */
        const updatedUser = {
          userId: user._id, /* check it from ../api/users.js */
          username,
          email,
          password,
        };
        if (file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profilePic = filename;
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          const res = await axios.put("/users/" + user._id, updatedUser);
          setSuccess(true);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
      };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPp">
                        <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} />
                        <label htmlFor="fileInput">
                            <AccountCircle className="settingsPpIcon" />
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}} onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span className="settingsNotification">Profile has been updated...</span>}
                </form>
            </div>
            <SideBar />
        </div>
    )
}
