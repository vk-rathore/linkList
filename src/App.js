import { useState } from "react";
import "./App.css";
import AddLinklist from "./Components/addLinklist";
import LinkList from "./Components/linkList";

function App() {
  const [linkList, SetLinkList] = useState([
    { value: "1", address: "$123", self: "$123" },
    { value: "2", address: "null", self: "$124" },
  ]);
  return (
    <div className="App">
      <div className="container">
        <div className="col-4">
          <AddLinklist />
        </div>
        <div className="col-8 ">
          LinkList
          <div className="lList">
            {linkList.map((node) => (
              <LinkList node={node} />
            ))}
          </div>
          {linkList?.length > 0 && (
            <div className="nullList">
              <div className="null">null</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
