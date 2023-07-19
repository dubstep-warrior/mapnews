import { MetadataKeys } from "./metadata.keys";
const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, '/api/v1' + basePath, target);
    console.log(MetadataKeys)
  };
}
export default Controller;