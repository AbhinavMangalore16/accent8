import { OrganizationList } from "@clerk/nextjs";

export default function OrgsPage(){
    return (
        <>

        <OrganizationList hidePersonal
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        appearance={{elements:{
            rootBox: "mx-auto",
            card: "shadow-lg",
        }}}
        />
        </>
    )
}