import {useRef, ReactNode, ReactElement, useEffect} from 'react'
import styles from './SectionList.module.css'
import {genericMemo} from 'lib'

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

  const observer = useRef(new IntersectionObserver(handleEndReached, {threshold: onEndReachedThreshold}))

  const createObserver = () => {
    if (scrollIndicator.current) {
      observer.current.observe(scrollIndicator.current)
    }
  }

  useEffect(() => {
    createObserver()

    return () => observer.current.disconnect()
  }, [sections.length])

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
        <div className={styles.sectionListSectionItemHeader}>
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
          <div data-element='section-header'>
            <ul className={`${styles.sectionListItems} ${styles.listReset}`} data-element='section-data'>
              {data.data.map(renderSectionItem)}
            </ul>
          </div>
        </li>
      )
    }

    return null
  }

  if (sections.length) {
    return (
      <div className={sectionListClassNames} data-element='section-list'>
        <ul className={`${styles.sectionListSections}, ${styles.listReset}`} data-element='sections'>
          {sections.map(renderSection)}
        </ul>

        {shouldLoadData ? <div ref={scrollIndicator} /> : null}
        <>{ListFooterComponent}</>
      </div>
    )
  } else if (ListEmptyComponent) {
    return ListEmptyComponent
  } else {
    return null
  }
})