# SectionList
Component for rendering sectioned lists for plain React. 
<br>
Created by analogy with React Native SectionList.

## Installation
The package can be installed via [npm](https://github.com/npm/cli):

```
npm install @protonko/section-list
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add @protonko/section-list
```

You’ll need to install `react` and `react-dom` separately since those dependencies aren’t included in the package. 

## Support
- React 17.0.0 or newer

## Usage
```typescript
import React from 'react';
import {Section, SectionList} from '@protonko/section-list'

interface ExampleData {
  id: number,
  title: string,
  description: string,
  // ...any attributes
}

const sections: Section<ExampleData> = [{
  title: 'Section 1',
  data: [{id: 1, title: 'title 1', description: 'descr'}]
}]

const Example = () => {
  const keyExtractor = (item: ExampleData) => item.id
  
  const renderItem = (elem: ExampleData) => (
    <article>
      <h2>{elem.title}</h2>
      <p>{elem.description}</h2>
    </article>
  )
  
  return (
    <SectionList<ExampleData>
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      sections={sections}
    />
  )
}
```

## Props
The component expects a generic-type <span id="genericT">T</span> that describes section data.

| Name                  | Description                                                                                                                | Type                                                                          | Required |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|----------|
| keyExtractor          | Used to extract a unique key for a given item at the specified index.                                                      | (item: [T](#genericT), index: number) => string                               | yes      |
| renderItem            | Default renderer for every item in every section.                                                                          | (value: [T](#genericT), index: number, array: [T](#genericT)[]) => ReactNode, | yes      |
| sections              | The actual data to render.                                                                                                 | {title: string, data: [T](#genericT)[]}[]                                     | yes      |
| className             | Used to override a component's styles using custom classes.                                                                | string                                                                        | no       |
| onEndReached          | Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content.                          | () => void                                                                    | no       |
| onEndReachedThreshold | How far from the end the bottom edge of the list must be from the end of the content to trigger the onEndReached callback. | number                                                                        | no       |
| renderSectionHeader   | Rendered at the top of each section.                                                                                       | (title: {title: string, data: [T](#genericT)[]}) => ReactNode                 | no       |
| shouldLoadData        | Indicate whether to create an IntersectionObserver.                                                                        | boolean                                                                       | no       |
| ListEmptyComponent    | Rendered when the list is empty.                                                                                           | ReactElement                                                                  | no       |
| ListFooterComponent   | Rendered at the very end of the list.                                                                                      | ReactElement                                                                  | no       |
