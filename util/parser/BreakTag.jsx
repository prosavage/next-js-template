import { Tag } from "bbcode-to-react";

class BreakTag extends Tag {

    constructor(renderer, settings = {}) {
        super(renderer, settings);
        this.SELF_CLOSE = true;
        this.STRIP_OUTER = true;
      }
  toReact() {
    return <br/>;
  }
}

export default BreakTag;
