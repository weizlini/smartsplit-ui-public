import { observer } from "mobx-react-lite";
import parse from "html-react-parser";
import SocanDiagram from "./SocanDiagram";
import SoproqDiagram from "./SoproqDiagram";
import SoundCloud from "./SoundCloud";
const CampaignPage = ({ html }) => {
  const content = parse(html, {
    replace: (domNode) => {
      if (domNode.name === "figure") {
        switch (domNode.attribs.id) {
          case "socan":
            return (
              <div>
                <SocanDiagram />
              </div>
            );
          case "soproq":
            return (
              <div>
                <SoproqDiagram />
              </div>
            );
          case "soundCloud":
            return (
              <div>
                <SoundCloud />
              </div>
            );
          default:
            return <p>unrecognized id of figure</p>;
        }
      } else return domNode;
    },
  });
  return <>{content}</>;
};
export default observer(CampaignPage);
