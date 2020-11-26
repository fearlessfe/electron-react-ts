import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import 'bootstrap/dist/css/bootstrap.min.css'
import defaultFiles from './utils/defaultFiles'
import './App.css'

function App() {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-4 left-panel">
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
        <div className="col-8 right-panel"></div>
      </div>
    </div>
  );
}

export default App;
