import {useRef, ReactNode, ReactElement, useEffect} from 'react'
import {genericMemo} from '../genericMemo'
import {SectionList as SectionListStyled, Sections, SectionHeader, SectionData} from './SectionList.style'

export interface Section<T> {
  title: string,
  data: T[],
}

interface Props<T> {
  keyExtractor: (item: T, index: number) => string,
  renderItem: (value: T, index: number, array: T[]) => ReactNode,
  sections: Section<T>[],
  className?: string,
  onEndReached?: () => void,
  onEndReachedThreshold?: number,
  renderSectionHeader?: (title: Section<T>) => ReactNode,
  shouldLoadData?: boolean,
  ListEmptyComponent?: ReactElement,
  ListFooterComponent?: ReactElement,
}

export const SectionList = genericMemo(<T,>({
  keyExtractor,
  renderItem,
  sections,
  className,
  onEndReached,
  onEndReachedThreshold = 1,
  renderSectionHeader,
  shouldLoadData,
  ListEmptyComponent,
  ListFooterComponent,
}: Props<T>) => {
  let sectionListClassNames = ''

  if (className) {
    sectionListClassNames += ' ' + className
  }

  const scrollIndicator = useRef<HTMLDivElement>(null)

  const handleEndReached = (entries: IntersectionObserverEntry[]) => {
    if (onEndReached && entries[0].isIntersecting) {
      onEndReached()
    }
  }

  const observer = useRef<IntersectionObserver>()

  const createObserver = () => {
    if (scrollIndicator.current && observer.current) {
      observer.current.observe(scrollIndicator.current)
    }
  }

  useEffect(() => {
    observer.current = new IntersectionObserver(handleEndReached, {threshold: onEndReachedThreshold})
  }, [])

  useEffect(() => {
    createObserver()

    return () => observer.current?.disconnect()
  }, [scrollIndicator.current])

  const renderSectionItem = (value: T, index: number, array: T[]) => {
    return (
      <li key={keyExtractor(value, index)} data-element='list-item'>
        {renderItem(value, index, array)}
      </li>
    )
  }

  const _renderSectionHeader = (data: Section<T>) => {
    if (renderSectionHeader) {
      return (
        <div data-element='section-header'>
          {renderSectionHeader(data)}
        </div>
      )
    }

    return null
  }

  const renderSection = (data: Section<T>) => {
    if (data.data.length) {
      return (
        <li key={data.title} data-element='section'>
          {_renderSectionHeader(data)}
          <SectionHeader data-element='section-header'>
            <SectionData data-element='section-data'>
              {data.data.map(renderSectionItem)}
            </SectionData>
          </SectionHeader>
        </li>
      )
    }

    return null
  }

  if (sections.length) {
    return (
      <SectionListStyled className={sectionListClassNames} data-element='section-list'>
        <Sections data-element='sections'>
          {sections.map(renderSection)}
        </Sections>
        {shouldLoadData ? <div ref={scrollIndicator} /> : null}
        <>{ListFooterComponent}</>
      </SectionListStyled>
    )
  } else if (ListEmptyComponent) {
    return ListEmptyComponent
  } else {
    return null
  }
})