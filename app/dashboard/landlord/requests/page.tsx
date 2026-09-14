import { getAllRequest } from './_actions/getAllRequest';
import LandlordRequestsClient from './_components/LandlordRequest';


export default async function LandlordRequestsPage() {
  const res = await getAllRequest();
  const rawData = res?.data;

  const requests = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.requests)
    ? rawData.requests
    : [];

  return <LandlordRequestsClient requests={requests} />;
}