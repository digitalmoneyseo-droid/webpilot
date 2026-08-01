import { portfolioRoutes } from "@/lib/portfolio-routes";

export const generateStaticParams = portfolioRoutes.de.generateStaticParams;
export const generateMetadata = portfolioRoutes.de.generateMetadata;
export default portfolioRoutes.de.DetailPage;
