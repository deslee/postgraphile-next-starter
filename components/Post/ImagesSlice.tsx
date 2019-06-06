import {ImagesSlice, VideoSlice} from "./PostData";
import {AssetType} from "../Asset/AssetData";
import GenericAssetSlice from "./GenericAssetSlice";

interface ComponentProps {
    slice: ImagesSlice;
    name: string;
}

export default (props: ComponentProps) => {
    return <GenericAssetSlice {...props} type="IMAGE" />
}