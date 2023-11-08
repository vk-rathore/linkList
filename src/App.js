import { useState } from "react";
import "./App.css";
import AddLinklist from "./Components/addLinklist";
import LinkList from "./Components/linkList";

function App() {
  const [linkList, SetLinkList] = useState([]);

  const addList = (val, add) => {
    if (linkList.length === 0) {
      //first time adding linklist
      SetLinkList([...linkList, { value: val, address: "null", self: "100" }]);
    } else {
      //else rest of the link list
      if (add === "" || add === "null") {
        // address is not given so linklist is going to add at the end of the linklist
        const { value, address, self } = linkList.pop();
        SetLinkList([
          ...linkList,
          { value, address: `${+self + 1}`, self },
          { value: val, address: "null", self: `${+self + 1}` },
        ]);
      } else {
        //is address is specified
        
        let index=-1;
        let parentNode=linkList.find((i, ind) => {
          if (i.self === add) {
            index = ind;
            return i;
          }
        });
        if (index>-1) {
          if (index === linkList.length - 1) {
            const { value, address, self } = linkList.pop();
            SetLinkList([
              ...linkList,
              { value, address: `${+self + 1}`, self },
              { value: val, address: "null", self: `${+self + 1}` },
            ]);
          } else {
            const nextNodeAdd = linkList[index + 1].self;
            const currSelf = Math.random();
            const newNode = {
              value: val,
              address: nextNodeAdd,
              self: currSelf,
            };
            parentNode['address']=currSelf;
            linkList.splice(index,1,parentNode)
            linkList.splice(index + 1, 0, newNode);
            SetLinkList([...linkList]);
          }
        } else {
          alert("Enterd adderss is not found add correct address");
        }
      }
    }
  };


  const removeList=(index,slf)=>{
    if(index===0){
      linkList.shift();
      SetLinkList([...linkList])
    }else if(index===linkList.length-1){
  
      let previousNode=linkList[index-1];
      previousNode["address"]="null"
      linkList.pop();
      SetLinkList([...linkList])
    }else{
      let node=linkList[index];
      let prvNode=linkList[index-1];
      let nxtNode=linkList[index+1];

      prvNode["address"]=nxtNode.self;
      linkList.splice(index-1,1,prvNode);
      linkList.splice(index,1);
      SetLinkList([...linkList])
    }
   
    
  }


  return (
    <div className="App">
      <div className="container">
        <div className="col-4">
          <AddLinklist addList={addList} />
        </div>
        <div className="col-8 ">
          LinkList
          <div className="lList">
            {linkList.map((node,index) => (
              <LinkList node={node} index={index} removeList={removeList}/>
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
