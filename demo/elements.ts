import { Data } from "./types";

//@ts-ignore
import png1 from "./assets/1";
//@ts-ignore
import png2 from "./assets/2";
//@ts-ignore
import png3 from "./assets/3";
//@ts-ignore
import png4 from "./assets/4";
//@ts-ignore
import png5 from "./assets/5";
//@ts-ignore
import png6 from "./assets/6";

export default [
  { id: "jason", type: "item", label: "jason", avatar: png1 },
  { id: "alice", type: "item", label: "alice", avatar: png2 },
  { id: "mark", type: "item", label: "mark", avatar: png3 },
  { id: "cook", type: "item", label: "cook", avatar: png4 },
  { id: "steve", type: "item", label: "steve", avatar: png5 },
  { id: "stefen", type: "item", label: "stefen", avatar: png6 },
  { id: "arc", type: "item", label: "arc", avatar: png1 },
  { id: "webpack", type: "item", label: "webpack", avatar: png2 },
  { id: "james", type: "item", label: "james", avatar: png3 },
  { id: "kobe", type: "item", label: "kobe", avatar: png4 },
  { id: "team-A", type: "container", label: "team-A" },
  { id: "team-B", type: "container", label: "team-B" },
] as Data;
