import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export function Signin(){
    return(
    <div className="grid grid-cols-1 xl:grid-cols-2">
        <div >
            <Auth type = "signin"/>
        </div>
        <div className="invisible lg:visible">
            <Quote />
        </div>
    </div>
    )
}