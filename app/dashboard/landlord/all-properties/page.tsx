import LandlordPropertiesClient from '../../_components/LandlordProperties';
import { getAllProperties } from '../_actions/getAllProperties';




export default async function LandlordPropertiesPage() {
  const res = await getAllProperties();

  // Safely extract properties array
  const rawData = res?.data;
  const properties = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.properties)
    ? rawData.properties
    : [];

  return <LandlordPropertiesClient properties={properties} />;
}