import getConversartions from "../actions/getConversation";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";


export default async function ConversationLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
   const  conversations=await getConversartions();
    
    return(
        <Sidebar>
        <div className="h-full">
           <ConversationList
           initialItems={conversations}
           />
            {children}
        </div>
        </Sidebar>
    )
  };