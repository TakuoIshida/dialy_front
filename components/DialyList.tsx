import { IProps } from '@/types/type'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import router from 'next/router'
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_list.module.scss'

const DialyList: React.FC<IProps> = (props: IProps) => {
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
        onRowClick={row => router.push(`/${row.id}`)}
        autoHeight={true}
        columnBuffer={0}
        hideFooterRowCount
      />
    </div>
  )
}

export default DialyList
