/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Explicitly declares css side-effect modules to the TS compiler engine
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}