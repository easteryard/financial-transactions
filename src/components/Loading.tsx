// export default function Loading () {
//   return (
//     <OuterDiv>
//       <Ring />
//     </OuterDiv>
//   )
// }
//
// const OuterDiv = styled.div`
//   display: flex;
//   width: 100%;
//   height: 50vh;
//   justify-content: center;
//   align-items: center;
// `

import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export default Spinner;
