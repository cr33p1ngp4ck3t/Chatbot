import ChatBot from "./components/chat";
import Sidebar from "./components/Sidebar";


export default function Home() {
  
  return (
    <>
      <div className="w-full flex">
        {/* Side bar */}        
          <Sidebar />
        {/* Chat area */}
        <div className="h-screen flex-[3] w-full">
          <ChatBot />
        </div>
      </div>
    </>
  )
}
