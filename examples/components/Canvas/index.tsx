import * as React from "react";
import { Wrapper } from "./style";
import { Data } from "../../types";
import Container from "../Container";

type Props = {
  data: Data;
};

const Canvas: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <Wrapper>
      <Container data={data} />
    </Wrapper>
  );
};

export default Canvas;
