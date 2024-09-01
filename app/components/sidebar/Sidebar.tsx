import getCurrenUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

 export default async function Sidebar({children}:{
    children:React.ReactNode;
}){
    const currentUser=await getCurrenUser();
    
    return(
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!}/>
            <MobileFooter currentUser={currentUser!}/>
            <main className="lg:pl-20 h-full">
            {children}
            </main>
        </div>

    )
}