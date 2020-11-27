import { useState } from 'react'
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import SimpleMDE from 'react-simplemde-editor'
import { v4 as uuidv4 } from 'uuid'
import "easymde/dist/easymde.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { File } from './types/index'
import defaultFiles from './utils/defaultFiles'
import './App.css'

type FileProp = keyof File;

function App() {
  const [files, setFiles] = useState<File[]>(defaultFiles);
  const [activeFileID, setActiveFileID] = useState<string>('');
  const [opendFileIDs, setOpendFileIDs] = useState<string[]>([])
  const [unsaveddFileIDs, setUnsavedFileIDs] = useState<string[]>([])
  const [searchedFiles, setsearchedFiles] = useState<File[]>([]);
  const opendFiles = opendFileIDs.map(id => {
    return files.find(file => file.id === id)
  });

  const fileSearch = (value: string) => {
    const newFiles = files.filter(file => file.title.includes(value))
    setsearchedFiles(newFiles);
  }

  const fileClick = (id: string) => {
    setActiveFileID(id)

    !opendFileIDs.includes(id) && setOpendFileIDs([...opendFileIDs, id])
  }

  const tabClick = (id: string) => {
    setActiveFileID(id)
  }

  const tabClose = (id: string) => {
    const newOpendFileIDs = opendFileIDs.filter(fileId => fileId !== id)
    if(activeFileID === id) {
      newOpendFileIDs.length ? setActiveFileID(newOpendFileIDs[0]) : setActiveFileID('')
    }
    setOpendFileIDs(newOpendFileIDs)
  }

  const fileChange = (id: string, value: string) => {
    // const newFiles = files.map(file => {
    //   file.id === id && (file.body = value)
    //   return file
    // })
    const newFiles = updateFileById(id, 'body', value)
    setFiles(newFiles);

    !unsaveddFileIDs.includes(id) && setUnsavedFileIDs([...unsaveddFileIDs, id])
  }

  const deleteFile = (id: string) => {
    const newFiles = files.filter(file => file.id !== id)
    tabClose(id)
    setFiles(newFiles)
  }

  const updateFileName = (id: string, title: string) => {
    // const newFiles = files.map(file => {
    //   file.id === id && (file.title = title)
    //   return file
    // })
    const newFiles = updateFileById(id, 'title', title)

    setFiles(newFiles);
  }

  const createNewFile = () => {
    const newFiles = [
      ...files,
      {
        id: uuidv4(),
        title: '',
        body: '##  请输入Markdown',
        createAt: new Date().getTime(),
        isNew: true
      }
    ]
    setFiles(newFiles)
  }

  const updateFileById = (fileId: string, prop: FileProp, content: string) => {
    const newFiles = files.map((file: File) => {
      if(file.id === fileId) {
        (file[prop] as any) = content
        file.isNew && delete file.isNew
      }
      return file
    })
    return newFiles;
  }

  const activeFile = files.find(file => file.id === activeFileID)
  const fileListArr = searchedFiles.length ? searchedFiles : files
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-3 left-panel">
          <FileSearch title="我的云文档" onFileSearch={fileSearch} />
          <FileList 
            files={fileListArr} 
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn 
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
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
          {
            !activeFile &&
            <div className="start-page">
              选择或者创建新的 Markdown 文档
            </div>
          }
          {
            activeFile &&
            <>
              <TabList 
                files={opendFiles as File[]}
                activedId={activeFileID}
                unsaveIds={unsaveddFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE
                key={activeFile.id}
                value={activeFile.body}
                onChange={(value) => {fileChange(activeFileID, value)}}
                options={{
                  minHeight: '600px'
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
