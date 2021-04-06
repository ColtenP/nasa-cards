import React, { useState, useEffect, useMemo } from 'react'
import '../assets/style/Paginator.scss'

export type PaginatorProps<T> = {
  items: T[]
  onChange: (items: T[]) => void
}

export default function Paginator<T> (props: PaginatorProps<T>) {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const itemsPerPageValues = [6, 12, 25]
  const maxPage = useMemo(() => Math.floor(props.items.length / itemsPerPage) || 1, [props.items, itemsPerPage])

  useEffect(() => {
    if (page > maxPage) {
      return setPage(1)
    }

    props.onChange(props.items.slice((page - 1) * itemsPerPage, (page) * itemsPerPage))
  }, [page, itemsPerPage, props.items])

  return <div className="paginator">
    Items per Page:
    <select id="items-per-page-select" onChange={e => setItemsPerPage(parseInt(e.target.value))}>
      {
        itemsPerPageValues
          .map(value => <option key={value} value={value}>{value}</option>)
      }
    </select>

    Current Page:
    <select id="page-select" onChange={e => setPage(parseInt(e.target.value))}>
      {
        Array.from(Array(maxPage).keys())
          .map(pageValue => <option key={pageValue} value={pageValue + 1}>{pageValue + 1}</option>)
      }
    </select>

    Items: {props.items.length}
  </div>
}
