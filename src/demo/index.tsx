import type {DemoData} from './demoData'
import {useCallback, useEffect, useState} from 'react'
import {Section, SectionList} from 'lib'
import {Loader} from './Loader'
import './DemoSectionList.css'

const LIMIT = 10
const MAX_COUNT = 200
const URL = 'https://jsonplaceholder.typicode.com/todos?_start=0&_limit='

const EmptyComponent = () => {
  return <span>Empty</span>
}

const mapToSection = (demoData: DemoData[]) => {
  const spendingGroupedByDate = demoData.reduce((acc, current) => {
    if (acc[current.userId]) {
      acc[current.userId].push(current)
    } else {
      acc[current.userId] = [current]
    }

    return acc
  }, {} as Record<string, DemoData[]>)

  return Object.entries(spendingGroupedByDate).map(elem => ({
    title: elem[0],
    data: elem[1],
  }))
}

export const DemoSectionList = () => {
  const [sections, setSections] = useState<Section<DemoData>[]>([])
  const [count, setCount] = useState(LIMIT)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(URL + count)
      .then(response => response.json())
      .then((json: DemoData[]) => setSections(mapToSection(json)))
      .then(() => setLoading(false))
  }, [count])

  const onEndReached = useCallback(() => {
    setCount(prev => prev + LIMIT)
  }, [])

  const renderItem = useCallback((elem: DemoData) => {
    return (
      <div className='card'>
        <span className='card__title'>{elem.title}</span>
        <span className='card__description'>user: {elem.userId}</span>
      </div>
    )
  }, [sections])

  const renderSectionHeader = useCallback((section: Section<DemoData>) => {
    return (
      <h2 className='secion-list__header'>
        {section.title}
      </h2>
    )
  }, [sections])

  const keyExtractor = useCallback((item: DemoData) => item.id.toString(), [])

  const renderLoader = useCallback(() => {
    if (loading) {
      return <Loader />
    }
  }, [loading])

  return (
    <SectionList<DemoData>
      className='section-list'
      ListEmptyComponent={<EmptyComponent />}
      ListFooterComponent={renderLoader()}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
      shouldLoadData={MAX_COUNT >= count}
    />
  )
}