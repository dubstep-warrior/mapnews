import ImageKit from "imagekit";

class ImageKitHandlerClass {
  private imageKitClient: ImageKit | undefined;

  setup() {
    this.imageKitClient = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
    });
  }

  get client() {
    return this.imageKitClient;
  }
}
export const ImageKitHandler = new ImageKitHandlerClass();

export const ImageKitClient = ImageKitHandler.client as ImageKit;
