import { useStorePath } from "../../state";
import { observer } from "mobx-react-lite";
import { diffYears } from "../../utilities";
import CampaignState from "../../state/CampaignState";
import type { Campaign, PublicSplit } from "../../api/campaign";
const SocanDiagram = () => {
  const campaignState: CampaignState = useStorePath("campaign");
  const split: PublicSplit = campaignState.split;
  const campaign: Campaign = campaignState.campaign;
  const years = diffYears(
    new Date(split.date_starts),
    new Date(split.date_ends)
  );
  return (
    <div className="camp-figure">
      <div className="campaign-info-box bg_fa">
        <div className="camp-label">Droits disponibles</div>
        <div className="campaign-nums">{split.percentage}%</div>
        <div className="camp-label">
          sur l’oeuvre et sur l’enregistrement sonore
        </div>
      </div>
      <div className="campaign-info-box bg_fa">
        <div className="camp-label">Partage des revenus sur</div>
        <div className="campaign-nums">
          {years} {years == 1 ? "an" : "ans"}
        </div>
        <div className="camp-label">minimum</div>
      </div>
      <div className="camp-diagram">
        <img src="https://smartsplit.s3.us-east-2.amazonaws.com/smartsplit_2023/campaigns/socan-split.png" />
      </div>
    </div>
  );
};
export default observer(SocanDiagram);
