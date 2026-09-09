export default async function PropertyDetailsPage({
    params,
}:{
    params : Promise<{id : string}>;
}) {

   const {id} = await params;
 
    return (
        <div>
            Property Details of id {id}
        </div>
    )
}