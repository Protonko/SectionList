import {useRef, ReactNode, ReactElement, useEffect} from 'react'
import styles from './SectionList.module.css'
import {genericMemo} from 'lib'

export interface Section<T> {
  title: string,
  data: T[],
}

interface Props<T> {
  className?: string,
  keyExtractor: (item: T, index: number) => string,
  renderSectionHeader: (title: Section<T>) => ReactNode,
  renderItem: (value: T, index: number, array: T[]) => ReactNode,
  sections: Section<T>[],
  ListEmptyComponent: ReactElement,
  ListFooterComponent?: ReactElement,
  onEndReached: () => void,
  shouldLoadData: boolean,
}

export const SectionList = genericMemo(<T,>({
  className,
  keyExtractor,
  sections,
  renderItem,
  renderSectionHeader,
  ListEmptyComponent,
  ListFooterComponent,
  onEndReached,
  shouldLoadData
}: Props<T>) => {
  let sectionListClassNames = ''

  if (className) {
    sectionListClassNames += ' ' + className
  }

  const scrollIndicator = useRef<HTMLDivElement>(null)

  const handleEndReached = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      onEndReached()
    }
  }

  const observer = useRef(new IntersectionObserver(handleEndReached))

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
      <li key={keyExtractor(value, index)}>
        {renderItem(value, index, array)}
      </li>
    )
  }

  const renderSection = (data: Section<T>) => {
    if (data.data.length) {
      return (
        <li key={data.title}>
          <div className={styles.sectionListSectionItemHeader}>
            {renderSectionHeader(data)}
          </div>
          <div>
            <ul className={`${styles.sectionListItems} ${styles.listReset}`}>
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
      <div className={sectionListClassNames}>
        <ul className={`${styles.sectionListSections}, ${styles.listReset}`}>
          {sections.map(renderSection)}
        </ul>

        {shouldLoadData ? <div ref={scrollIndicator} /> : null}
        <>{ListFooterComponent}</>
      </div>
    )
  }

  return ListEmptyComponent
})