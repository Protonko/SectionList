import styled, {css} from 'styled-components'

const sharedStyle = css`
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
`

export const SectionHeader = styled.div`
  margin-bottom: 10px;
  padding: 5px;
`;

export const SectionData = styled.ul`
  display: grid;
  gap: 10px;
  width: 100%;
  ${sharedStyle}
`;

export const Sections = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${sharedStyle}
`