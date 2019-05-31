import { CustomRequest, CustomResponse } from "./CustomRequestResponse";

export interface CustomContext {
    req: CustomRequest,
    res: CustomResponse,
    pgSettings?: {
        [key: string]: {} | string | number | boolean | undefined | null;
    },
    rootMutationWrapper: {
        [x: string]: (args: any) => Promise<void>
    }
}
