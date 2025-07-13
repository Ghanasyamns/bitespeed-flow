type Props = {
  id: string;
  data: Record<string, string>;
  type: string;
};
function TextNode({ data }: Props) {
  return <div>{data.message}</div>;
}

export default TextNode;
