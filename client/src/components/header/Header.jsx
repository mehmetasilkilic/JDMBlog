import "./header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitlesSm">34 ISTANBUL</span>
                <span className="headerTitlesLg">JDM CAR BLOG</span>
            </div>
            <img className="headerImg" src="https://images.unsplash.com/photo-1582184855746-0eb5b53ac036?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80" alt="" />
        </div>
    )
}
