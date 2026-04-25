import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSiteData } from "../../contexts/SiteDataContext";
import NotFound from "../../pages/NotFound";
import { resolveConfigPageData } from "../pageDataResolver";
import {
  resolveBoardPageConfig,
  resolveClassPageConfig,
  resolveCityPageConfig,
  resolveExamPageConfig,
  resolveGurugramEntryConfig,
  resolveGurugramHubConfig,
  resolveSectorAliasConfig,
  resolveSectorPageConfig,
} from "../pageConfigService";
import BoardPageTemplate from "../templates/BoardPageTemplate";
import CityPageTemplate from "../templates/CityPageTemplate";
import ClassPageTemplate from "../templates/ClassPageTemplate";
import ExamPageTemplate from "../templates/ExamPageTemplate";
import GenericPageTemplate from "../templates/GenericPageTemplate";
import SectorPageTemplate from "../templates/SectorPageTemplate";

const TEMPLATE_MAP = {
  BoardPageTemplate,
  CityPageTemplate,
  ClassPageTemplate,
  ExamPageTemplate,
  GenericPageTemplate,
  SectorPageTemplate,
};

function ConfigDrivenPageRoute({ routeType }) {
  const params = useParams();
  const { siteData } = useSiteData();
  const boardSlug = params.boardSlug ?? params.board;
  const stageSlug = params.stageSlug ?? params.stage;
  const trackSlug = params.trackSlug ?? params.track;
  const citySlug = params.citySlug ?? params.city;
  const sectorSlug = params.sectorSlug ?? params.sector;
  const classSlug = params.classSlug;
  const examSlug = params.examSlug;
  const entrySlug = params.entrySlug;

  const config = useMemo(() => {
    switch (routeType) {
      case "board":
        return resolveBoardPageConfig([boardSlug, stageSlug, trackSlug]);
      case "gurugram-hub":
        return resolveGurugramHubConfig(siteData);
      case "gurugram-entry":
        return resolveGurugramEntryConfig(siteData, entrySlug);
      case "city":
        return resolveCityPageConfig(siteData, citySlug);
      case "sector":
        return resolveSectorPageConfig(siteData, citySlug, sectorSlug);
      case "gurugram-sector":
        return resolveSectorAliasConfig(siteData, sectorSlug);
      case "class":
        return resolveClassPageConfig(classSlug);
      case "exam":
        return resolveExamPageConfig(examSlug);
      default:
        return null;
    }
  }, [boardSlug, stageSlug, trackSlug, citySlug, sectorSlug, classSlug, examSlug, entrySlug, routeType, siteData]);
  const templateData = useMemo(() => resolveConfigPageData(config), [config]);

  if (!config || config.publishStatus !== "published") {
    return <NotFound />;
  }

  const TemplateComponent = TEMPLATE_MAP[config.template];

  if (!TemplateComponent) {
    return <NotFound />;
  }

  return <TemplateComponent config={config} templateData={templateData} />;
}

export default ConfigDrivenPageRoute;
