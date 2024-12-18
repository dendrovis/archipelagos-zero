/** Components Packages */
import CanvasBoard from "./CanvasBoard";
import CanvasUnit from "./CanvasUnit";
import CanvasPlayer from "./CanvasPlayer";
//import CanvasHighlight from "./CanvasHighlight";

/** Debug */
import * as DEV from "../config/debug";

//const HighlightContext = createContext();

/*function HighLightController(props) {
  const [isHighlighted, setHighLight] = useState(0);

  return (
    <HighlightContext.Provider value={[isHighlighted, setHighLight]}>
      {props.children}
    </HighlightContext.Provider>
  );
}*/

/**
 * Represent the game mechanism components
 * @param {*} param0
 * @returns
 */
export default function GameZone({ data, state }) {
  if (DEV.DEBUG) console.log("Load Game Zone");
  return (
    <>
      <CanvasBoard />
      <CanvasPlayer data={data} />
      {
        //     <CanvasHighlight data={data} state={state} />
      }
      <CanvasUnit data={data} state={state} />
    </>
  );
}
