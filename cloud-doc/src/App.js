import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './component/FileSearch'
import FileList from './component/FileList'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './component/BottomBtn'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import TabList from './component/TabList'
function App () {
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            onFileSearch={(value) => { console.log(value) }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(id) => { console.log("deleting", id) }}
            onSaveEdit={(id, newValue) => { console.log(id); console.log(newValue) }}
          />
          <div className="row no-gutters">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          <TabList
            files={defaultFiles}
            activeId="1"
            onTabClick={(id) => { console.log(id) }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
