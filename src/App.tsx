import FileSearch from './components/FileSearch/FileSearch'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 left-panel">
          <FileSearch title="我的云文档" onFileSearch={(value) => {console.log(value)}} />
        </div>
        <div className="col-8 right-panel"></div>
      </div>
    </div>
  );
}

export default App;
