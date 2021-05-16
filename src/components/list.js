import React, { useState } from 'react'
import { XGrid } from '@material-ui/x-grid'
import { useDemoData } from '@material-ui/x-grid-data-generator'

export const List = (props) => {
    /*const hjk = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100000,
    })
    console.log(hjk.data)*/
    const { columns, rows } = props
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        pageSize: 25,
    })
    const [sort, setSort] = useState({})

    return (
        <div style={{ height: 520, width: '100%' }}>
            <XGrid
                rows={rows}
                columns={columns}
                onSortModelChange={(col) => {
                    const { sortModel } = col
                    const { page, pageSize } = pageInfo

                    setSort(sortModel[0])
                    if (sortModel.length > 0) {
                        props.getRows(
                            sortModel[0].field,
                            pageSize,
                            page * pageSize,
                            sortModel[0].sort
                        )
                    }
                }}
                onPageSizeChange={(p) => {
                    const { page, pageSize } = p
                    setPageInfo(p)
                    props.getRows(
                        sort.field,
                        pageSize,
                        page * pageSize,
                        sort.sort
                    )
                }}
                onPageChange={(p) => {
                    const { page, pageSize } = p
                    setPageInfo(p)
                    props.getRows(
                        sort.field,
                        pageSize,
                        page * pageSize,
                        sort.sort
                    )
                }}
                onEditRowModelChange={(p) => {
                    console.log(p)
                }}
                rowCount={props.count}
                sortingOrder={['asc', 'desc']}
                pagination
                sortingMode="server"
                rowsPerPageOptions={[25, 50, 100]}
                paginationMode="server"
                loading={props.loading}
                rowHeight={38}
                checkboxSelection
            />
        </div>
    )
}
