export default function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    const array = [...arr]; // shallow copy the array
    var element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;
}