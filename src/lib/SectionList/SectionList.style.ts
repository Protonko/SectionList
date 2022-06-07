const sharedStyle = {
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: 0,
  listStylType: 'none',
}

export const sectionListStyle = {
  paddingBottom: 1,
}

export const sectionHeaderStyle = {
  marginBottom: 10,
  padding: 5,
}

export const sectionDataStyle = {
  ...sharedStyle,
  display: 'grid',
  gap: 10,
  width: '100%',
}

export const sectionsStyle = {
  ...sharedStyle,
  display: 'flex',
  'flex-direction': 'column',
  gap: 30,
}