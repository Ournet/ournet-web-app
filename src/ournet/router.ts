import { Router, RegExpRoutePattern } from "../base/router";
import { OurnetViewModelInput } from "./view-model";
import { Request, Response } from "../base/types";
import { getHostInfo } from "../hosts";
import { OurnetProjectName } from "./data";
import { createAppConfig, OurnetAppConfig } from "./config";

export abstract class OurnetRouter<DATA = void> extends Router<DATA> {
  constructor(path: string, names?: (keyof DATA)[]) {
    super(new RegExpRoutePattern(formatRouteRegExp(path), names));
  }

  formatInput<INPUT extends OurnetViewModelInput>(req: Request, res: Response) {
    const url = this.parseUrl(req);
    const host = req.headers.host || "";
    const hostInfo = getHostInfo(host);

    const input: OurnetViewModelInput = {
      req,
      res,
      host,
      url,
      country: hostInfo.country,
      project: hostInfo.project
    };

    return input as INPUT;
  }

  protected createAppConfig<CONFIG extends OurnetAppConfig = OurnetAppConfig>(
    project: OurnetProjectName,
    country: string
  ) {
    return createAppConfig<CONFIG>(project, country);
  }
}

function formatRouteRegExp(path: string) {
  if (path[path.length - 1] !== "/") {
    path += "/?";
  }
  return new RegExp(`^${path.replace(/\//g, "/")}$`);
}
