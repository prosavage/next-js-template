import parser from "bbcode-to-react";
import LightTag from "./LightTag";
import BreakTag from "./BreakTag";
import DarkTag from "./DarkTag";
import LeftTag from "./LeftTag";
import QuoteTag from "./QuoteTag";
import IndentTag from "./IndentTag";
import ImageTag from "./ImageTag";


parser.registerTag("quote", QuoteTag);
parser.registerTag("left", LeftTag);
parser.registerTag("br", BreakTag);
parser.registerTag("dark", DarkTag);
parser.registerTag("light", LightTag);
parser.registerTag("indent", IndentTag);
parser.registerTag("img", ImageTag);


export default parser;
