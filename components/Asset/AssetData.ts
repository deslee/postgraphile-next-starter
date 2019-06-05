import {Omit} from "../../utils/TypeUtils";
import {Asset} from "../../server/embeddedGraphql/bindings";

export interface AssetData {
    name: string,
    description?: string
    fileName: string
    privateNotes: string
}

export function jsonToAssetData(json: string): AssetData {
    const rawAssetData = JSON.parse(json);
    return {
        ...rawAssetData
    }
}

export type AssetWithData = Omit<Asset, "data"> & {data: AssetData}

export function assetDataToJson(data: AssetData): string {
    return JSON.stringify({
        name: data.name,
        description: data.description,
        fileName: data.fileName,
        privateNotes: data.privateNotes
    })
}