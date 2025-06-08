import Folder from "./Folder.js";
import {FolderStructure} from './data.ts'


const Main = () => {
    return (
        <>
        
        <div className="p-4 font-mono">
            <h1 className="font-bold mb-4" > Folder Structure  </h1>
            <Folder node={FolderStructure}/>
            </div>
            </>
    )
}
export default Main