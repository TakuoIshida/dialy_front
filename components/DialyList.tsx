import { selectDialy } from '@/dev/Actions'
import { DialyType, IProps } from '@/types/type'
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridSortDirection,
} from '@material-ui/data-grid'
import router from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_list.module.scss'

const DialyList: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch()

  const handleRowSelected = (gridRowData: GridRowData) => {
    const rowsData = gridRowData as DialyType
    const selectedDialy: DialyType = {
      id: rowsData.id,
      title: rowsData.title,
      content: rowsData.content,
      positiveSentiment: rowsData.positiveSentiment,
      negativeSentiment: rowsData.negativeSentiment,
      nutralSentiment: rowsData.nutralSentiment,
      mixedSentiment: rowsData.mixedSentiment,
      isDeleted: rowsData.isDeleted,
      created_at: rowsData.created_at,
      updated_at: rowsData.updated_at,
    }
    dispatch(selectDialy(selectedDialy))
    router.push(`/${rowsData.id}`)
    return
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 75, disableColumnMenu: true },
    {
      field: 'title',
      width: 250,
      headerName: 'タイトル',
      disableColumnMenu: true,
    },
    {
      field: 'content',
      headerName: '内容',
      width: 400,
      disableColumnMenu: true,
    },
    {
      field: 'sentimentResult',
      headerName: '感情',
      width: 100,
      disableColumnMenu: true,
    },
  ]
  return (
    <div className={style.dialyList__dataGrid}>
      <DataGrid
        rows={props.dialyList}
        columns={columns}
        pageSize={5}
        loading={props.dialyList.length === 0}
        onRowClick={gridRowParams => handleRowSelected(gridRowParams.row)}
        autoHeight={true}
        columnBuffer={0}
        hideFooterRowCount
        sortingOrder={['asc', 'desc']}
        sortModel={[
          {
            field: 'id',
            sort: 'desc' as GridSortDirection,
          },
        ]}
      />
    </div>
  )
}

export default DialyList
