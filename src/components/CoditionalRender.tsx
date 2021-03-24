import React from 'react'

import Loading from './Loading'

interface IProps<T> {
  children: any
  dataArray: T[]
  loadingArray: boolean[]
  errorArray: any[]
  errorMessage: string
}

export default function ConditionalRender<T> ({ children, dataArray, loadingArray, errorArray, errorMessage }: IProps<T>) {
  if (loadingArray.some(element => element)) return <Loading />
  if (errorArray.some(element => !!element)) return <p>{errorMessage}</p>
  return children(dataArray)
}
