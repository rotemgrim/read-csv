import { HelloWorldController } from "./controller/HelloWroldController";
import { ExtractController } from "./controller/ExtractController";


/**
 * All application routes.
 */
export const AppRoutes = [
    {method: "get", path: "/hello", action: HelloWorldController.hello},
    {method: "get", path: "/parseCsv", action: ExtractController.extractBasic}
];