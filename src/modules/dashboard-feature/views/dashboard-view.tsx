import { SiteHeader } from "@/components/custom/site-header";
import { DashboardWaves } from "../components/dashboard-waves";
import { DashboardHeader } from "../components/dashboard-header";
import { InputBox } from "../components/input-box";
import { TipsPanel } from "../components/tips-panel";


export function DashboardView(){
    return(
        <div className="relative isolate">
            <SiteHeader title="Dashboard" className="lg:hidden"/>
            {/* <DashboardWaves/> */}
            <div className="relative z-10 space-y-8 p-4 lg:p-16">
                <DashboardHeader/>
                <InputBox/>
                <TipsPanel/>
            </div>
        </div>
    )
}