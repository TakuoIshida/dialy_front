import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_form.module.scss'

const BackToTop = () => {
  return (
    <Link href="/" passHref>
      <Button
        className={style.dialyForm__back}
        variant="contained"
        color="secondary">
        もどる
      </Button>
    </Link>
  )
}

export default BackToTop
