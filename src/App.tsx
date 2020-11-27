import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import defaultFiles from './utils/defaultFiles'
import './App.css'

function App() {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-3 left-panel">
          <FileSearch title="我的云文档" onFileSearch={(value) => {console.log(value)}} />
          <FileList 
            files={defaultFiles} 
            onFileClick={(id) => {console.log(id)}}
            onFileDelete={(id) => {console.log(id)}}
          />
          <div className="row no-gutters">
            <div className="col">
              <BottomBtn 
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={() =>{}}
              />
            </div>
            <div className="col">
              <BottomBtn 
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={() =>{}}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          <TabList 
            files={defaultFiles}
            activedId="1"
            unsaveIds={['1']}
            onTabClick={id => {console.log(id)}}
            onCloseTab={id => {console.log(id)}}
          />
          <SimpleMDE 
            value={defaultFiles[1].body}
            onChange={(value) => {console.log(value)}}
            options={{
              minHeight: '600px'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
