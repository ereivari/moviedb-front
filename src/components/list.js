import React, { useState } from 'react'
import { XGrid } from '@material-ui/x-grid'

import { TextField } from '@material-ui/core'

export const List = (props) => {
    const { columns, rows } = props

    const [pageSize, setPageSize] = useState(25)
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState({ field: 'name', sort: 'asc' })
    const [search, setSearch] = useState({})
    if (props.loading) {
        return null
    }
    return (
        <div style={{ height: 520, width: '100%' }}>
            {columns.map((s) => {
                const onFieldChange = (event) => {
                    search[s.field] = event.target.value
                    setSearch(search)
                    props.getRows(
                        sort.field,
                        pageSize,
                        page * pageSize,
                        sort.sort,
                        search
                    )
                }
                return (
                    <TextField
                        type={s.type || ''}
                        label={s.field}
                        onChange={onFieldChange}
                    />
                )
            })}
            <XGrid
                pageSize={pageSize}
                page={page}
                rows={rows.map((r) => ({ ...r, id: r.name }))}
                columns={columns}
                onSortModelChange={(col) => {
                    const { sortModel } = col

                    setSort(sortModel[0])
                    if (sortModel.length > 0) {
                        props.getRows(
                            sortModel[0].field,
                            pageSize,
                            page * pageSize,
                            sortModel[0].sort,
                            search
                        )
                    }
                }}
                onPageSizeChange={(p) => {
                    const { pageSize } = p
                    setPageSize(parseInt(pageSize, 10))
                    props.getRows(
                        sort.field,
                        pageSize,
                        page * pageSize,
                        sort.sort,
                        search
                    )
                }}
                onPageChange={(p) => {
                    const { page } = p
                    setPage(parseInt(page, 10))
                    props.getRows(
                        sort.field,
                        pageSize,
                        page * pageSize,
                        sort.sort,
                        search
                    )
                }}
                rowCount={props.count}
                sortingOrder={['asc', 'desc']}
                pagination
                sortingMode="server"
                rowsPerPageOptions={[25]}
                paginationMode="server"
                loading={props.loading}
                rowHeight={38}
            />
        </div>
    )
}
