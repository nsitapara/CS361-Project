import { fetchGroupsOptions } from "./FetchData";
import PanelData from "./PanelData";
export default async function CostSummaryPanel() {
  const options = await fetchGroupsOptions();
  return <PanelData options={options} />;
}
