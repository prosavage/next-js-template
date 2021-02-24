import React from "react";
import { Tag } from "bbcode-to-react";

export default class ImageTag extends Tag {
  constructor(renderer, settings = {}) {
    super(renderer, settings);
  }

  toHTML() {
    const attributes = {
      src: this.renderer.strip(this.getContent(true)),
    };

    if (this.params.width) {
      attributes.width = this.params.width;
    }

    if (this.params.height) {
      attributes.height = this.params.height;
    }

    return `<img ${this.renderer.htmlAttributes(attributes)} />`;
  }

  toReact() {
    const src = this.getContent(true);
    return (
      <img
        role="presentation"
        src={src}
        width={this.params.width}
        height={this.params.height}
      />
    );
  }
}
