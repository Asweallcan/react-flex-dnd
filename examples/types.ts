export type Data = Array<{
  id: string;
  type: "item" | "container";
  label: string;
  children?: Data;
}>;
