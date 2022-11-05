import styled, { keyframes } from 'styled-components';

interface LoaderCircleProps {
  color?: string;
  sectionQuantity?: number;
  duration: number;
  delay: number;
}

const LoaderCircle = (props: LoaderCircleProps) => {
  const arr = Array.from({
    length: props.sectionQuantity ? props.sectionQuantity : 3,
  });

  return (
    <Container>
      {arr.map((i: any, j: number) => {
        return (
          <Section
            color={props.color}
            duration={props.duration}
            delay={props.delay * (j + 0.5)}
            key={j}
          />
        );
      })}
    </Container>
  );
};

export default LoaderCircle;

const Rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 7rem;
  height: 7rem;
  position: relative;
`;

const Section = styled.span<LoaderCircleProps>`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.8rem solid black;
  border-radius: 50%;
  border-color: ${(props) => (props.color ? props.color : 'black')} transparent
    transparent transparent;
  animation: ${Rotation} ${(props) => `${props.duration}ms`} infinite;
  animation-delay: ${(props) => `-${props.delay}ms`};
`;
