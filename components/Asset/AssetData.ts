import {Omit} from "../../utils/TypeUtils";
import {Asset} from "../../server/embeddedGraphql/bindings";
import * as mime from 'mime-types';

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

export type AssetType = 'IMAGE' | 'VIDEO' | 'PDF' | 'AUDIO' | 'UNKNOWN'
export const getAssetType: (fileName: string) => AssetType = fileName => {
    const mimeType = mime.lookup(fileName);
    if (mimeType !== false) {
        const firstPart = mimeType.split('/')[0];
        if (firstPart.toUpperCase() === 'IMAGE') {
            return 'IMAGE'
        } else if (firstPart.toUpperCase() === 'VIDEO') {
            return 'VIDEO'
        } else if (mimeType.toLowerCase() === 'application/pdf') {
            return 'PDF'
        } else if (firstPart.toUpperCase() === 'AUDIO') {
            return 'AUDIO';
        } else {
            return 'UNKNOWN'
        }
    }
};

export function assetFilter(type: AssetType) {
    return (t: {uri?: string}) => mime.lookup(t.uri).toString().toUpperCase().indexOf(type) === 0
}