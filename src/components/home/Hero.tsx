import { Container } from "../common/Container";
import { HeroAvatar } from "./HeroAvatar";
import { HeroInfo } from "./HeroInfo";

const Hero = () => {
  return (
    <Container>
      <HeroAvatar />
      <HeroInfo />
    </Container>
  );
};

export { Hero };
