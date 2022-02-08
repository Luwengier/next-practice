import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'

function FilteredEvents() {
  const router = useRouter()
  const filterData = router.query.slug

  if (!filterData) {
    return <p className='center'>Loading...</p>
  }

  const numYear = +filterData[0]
  const numMonth = +filterData[1]

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2020 ||
    numMonth < 0 ||
    numYear > 2050 ||
    numMonth > 12
  ) {
    return <p className='center'>Invalid filter. Please adjust your values!</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className='center'>No events found for the chosen filter</p>
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FilteredEvents