import ChatBot from "./components/chat";
import Sidebar from "./components/Sidebar";


export default function Home() {
  
  return (
    <>
      <div className="w-full flex">
        {/* Side bar */}
        <div className="h-screen ">
          <Sidebar />
        </div>          
        {/* Chat area */}
        <div className="h-screen flex-[3] w-max">
          <ChatBot />
        </div>
      </div>
    </>
  )
}
