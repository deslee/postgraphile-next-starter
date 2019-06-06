import {ImagesSlice, VideoSlice} from "./PostData";
import GenericAssetSlice from "./GenericAssetSlice";

interface ComponentProps {
    slice: VideoSlice;
    name: string;
}

export default (props: ComponentProps) => {
    return <GenericAssetSlice {...props} type="VIDEO" />
}