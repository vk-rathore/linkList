import { useState } from "react";
import "./App.css";
import AddLinklist from "./Components/addLinklist";
import LinkList from "./Components/linkList";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const [linkList, SetLinkList] = useState([]);

  const addList = (val, add) => {
    if (linkList.length === 0) {
      //first time adding linklist
      SetLinkList([
        ...linkList,
        {
          id: "id" + Math.random().toString(16).slice(2),
          value: val,
          address: "null",
          self: "100",
        },
      ]);
    } else {
      //else rest of the link list
      if (add === "" || add === "null") {
        // address is not given so linklist is going to add at the end of the linklist
        const { id, value, address, self } = linkList.pop();
        SetLinkList([
          ...linkList,
          { id, value, address: `${+self + 1}`, self },
          {
            id: "id" + Math.random().toString(16).slice(2),
            value: val,
            address: "null",
            self: `${+self + 1}`,
          },
        ]);
      } else {
        //is address is specified

        let index = -1;
        let parentNode = linkList.find((i, ind) => {
          if (i.self == add) {
            index = ind;
            return i;
          }
        });
        if (index > -1) {
          if (index === linkList.length - 1) {
            const { id, value, address, self } = linkList.pop();
            SetLinkList([
              ...linkList,
              { id, value, address: `${+self + 1}`, self },
              {
                id: "id" + Math.random().toString(16).slice(2),
                value: val,
                address: "null",
                self: `${+self + 1}`,
              },
            ]);
          } else {
            const nextNodeAdd = linkList[index + 1].self;
            const currSelf = Math.random();
            const newNode = {
              id: "id" + Math.random().toString(16).slice(2),
              value: val,
              address: nextNodeAdd,
              self: `${currSelf}`,
            };
            parentNode["address"] = `${currSelf}`;
            linkList.splice(index, 1, parentNode);
            linkList.splice(index + 1, 0, newNode);
            SetLinkList([...linkList]);
          }
        } else {
          alert("Enterd adderss is not found add correct address");
        }
      }
    }
  };

  const removeList = (index, slf) => {
    if (index === 0) {
      linkList.shift();
      SetLinkList([...linkList]);
    } else if (index === linkList.length - 1) {
      let previousNode = linkList[index - 1];
      previousNode["address"] = "null";
      linkList.pop();
      SetLinkList([...linkList]);
    } else {
      let node = linkList[index];
      let prvNode = linkList[index - 1];
      let nxtNode = linkList[index + 1];

      prvNode["address"] = nxtNode.self;
      linkList.splice(index - 1, 1, prvNode);
      linkList.splice(index, 1);
      SetLinkList([...linkList]);
    }
  };

  const handleDragAndDrop = (results) => {
    console.log("dra and drop ", results);
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...linkList];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;
      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      // remove prev eliment , change address of prev eliment with eliment of next address
      if (storeSourceIndex - 1 >= 0) {
        const [prevEliment] = reorderedStores.splice(storeSourceIndex - 1, 1);
        prevEliment["address"] = removedStore.address;
        reorderedStores.splice(storeSourceIndex - 1, 0, prevEliment);
      }
      //at destination update address with next address
      if (storeDestinatonIndex === reorderedStores.length) {
        removedStore["address"] = "null";
      } else {
        removedStore["address"] = reorderedStores[storeDestinatonIndex].self;
      }

      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
      if (storeDestinatonIndex > 0) {
        //update prev address with current node
        const [destiPrevElement] = reorderedStores.splice(
          storeDestinatonIndex - 1,
          1
        );
        destiPrevElement["address"] = removedStore.self;
        reorderedStores.splice(storeDestinatonIndex - 1, 0, destiPrevElement);
      }

      return SetLinkList(reorderedStores);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="col-4">
          <AddLinklist addList={addList} />
        </div>

        <div className="col-8 ">
          LinkList
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="root" type="group">
              {(provided) => (
                <div
                  className="lList"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {linkList.map((node, index) => (
                    <Draggable
                      draggableId={node.id}
                      index={index}
                      key={node.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <LinkList
                            node={node}
                            index={index}
                            removeList={removeList}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {linkList?.length > 0 && (
              <div className="nullList">
                <div className="null">null</div>
              </div>
            )}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
