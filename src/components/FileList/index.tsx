import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from '../../hooks/useKeyPress'
import { File } from '../../types';
interface FileListProps {
  files: File[]
  onFileClick?: (id: string) => void
  onFileDelete?: (id: string) => void
  onSaveEdit?: (id: string, title: string) => void
}


const FileList: FC<FileListProps> = (props) => {
  const {
    files,
    onFileClick,
    onFileDelete,
    onSaveEdit
  } = props;

  const [editStatus, setEditStatus] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const handleFileClick = (file: File) => {
    onFileClick && onFileClick(file.id)
  }
  const handleFileDelete = (file: File) => {
    onFileDelete && onFileDelete(file.id)
  }
  const handleFileEdit = (file: File) => {
    setEditStatus(file.id);
    setValue(file.title);
  }

  const closeSearch = () => {
    setEditStatus('')
    setValue('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    if(enterPressed && editStatus) {
      const file = files.find(item => item.id === editStatus) as File;
      onSaveEdit && onSaveEdit(file.id, value);
      closeSearch()
    }
    if(escPressed && editStatus) {
      closeSearch()
    }
  });
  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li 
            className="list-group-item bg-light d-flex row align-items-center file-item mx-0"
            key={file.id}
          >
            { file.id !== editStatus &&
            <>
              <span className="col-2">
                <FontAwesomeIcon 
                  icon={faMarkdown}
                  size="lg"
                />
              </span>
              <span className="col-6 c-link" onClick={() => {handleFileClick(file)}}>{file.title}</span>
              <button 
                className="icon-button col-2"
                onClick={() => {handleFileEdit(file)}}
              >
                <FontAwesomeIcon 
                  icon={faEdit}
                  size="lg"
                  title="编辑"
                />
              </button>
              <button 
                className="icon-button col-2"
                onClick={() => {handleFileDelete(file)}}
              >
                <FontAwesomeIcon 
                  icon={faTrash}
                  size="lg"
                  title="删除"
                />
              </button>
            </>
            }
            {
              file.id === editStatus &&
              <>
                <input 
                  className="form-control"
                  value={value}
                  // ref={inputNode}
                  onChange={handleInputChange}
                />
                <button
                  className="icon-button"
                  onClick={closeSearch}
                >
                  <FontAwesomeIcon 
                    icon={faTimes}
                    size="lg"
                    title="关闭"
                  />
                </button>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
}

export default FileList