import './App.css'
import MindMap from './components/MindMap'
import { sampleMindMapData } from './data/mindmapData'

function App() {
  return (
    <>
      <MindMap data={sampleMindMapData} />
    </>
  )
}

export default App
