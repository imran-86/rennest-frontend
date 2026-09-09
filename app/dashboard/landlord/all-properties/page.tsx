import { getAllProperties } from "../_actions/getAllProperties"

export default async function LandlordAllPropertiesPage(){
    const result = await getAllProperties();
    console.log(result.data.length);
    
    return (
        <div>
        Landlord All properties {result.data.length}</div>
    )
}