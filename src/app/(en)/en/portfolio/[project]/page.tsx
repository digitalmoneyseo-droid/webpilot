import { portfolioRoutes } from "@/lib/portfolio-routes";

export const generateStaticParams = portfolioRoutes.en.generateStaticParams;
export const generateMetadata = portfolioRoutes.en.generateMetadata;
export default portfolioRoutes.en.DetailPage;
