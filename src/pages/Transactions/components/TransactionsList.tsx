import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Transaction, TransactionsQueryData } from '../../../hooks/transactions/get_transactions';
import { Row, useFilters, useSortBy, useTable } from 'react-table'
import { CaretDown, CaretUp, Delete } from '@styled-icons/fluentui-system-filled';
import Tooltip from '../../../components/Tooltip';
import { capitalizeFirstLetter, formatAmountWithCurrencyCode, formatTime } from '../../../utils/helperMethods';
import missingImage from '../../../images/missing_image.jpg'

interface IProps {
  data?: TransactionsQueryData
  handleDeletion: (id: string) => void
}

interface IRowCell<T> {
  cell: {
    value: T
  }
}

interface IAction {
  id: string
  deleted: string
}

interface IDefaultColumnFilter {
  column: {
    filterValue: any
    preFilteredRows: Array<Row>
    canFilter: boolean
    setFilter: (filterValue: string | undefined) => void
  }
}

export const TransactionsList = ({ data, handleDeletion }: IProps) => {
  console.log('data: ', data)

  function getMissingImage (ev: any) {
    if (ev.target.src !== missingImage) ev.target.src = missingImage
  }

  function renderImage (source: string) {
    return <img src={source} onError={getMissingImage} />
  }

  function renderActionButton (value: IAction) {
    return (
      <StyledDeleteButton onClick={() => handleDeletion(value.id)} disabled={!!value.deleted}>
        <StyledDeleteIcon />
      </StyledDeleteButton>
    )
  }

  const columns = useMemo(() => [
    {
      Header: 'Icon',
      Cell: (row: IRowCell<string>) => renderImage(row.cell.value),
      accessor: 'icon' as const,
      disableFilters: true
    },
    {
      Header: 'Type',
      accessor: 'type' as const,
      disableFilters: true
    },
    {
      Header: 'Title',
      accessor: 'title' as const
    },
    {
      Header: 'Amount',
      accessor: 'amount' as const,
      disableFilters: true
    },
    {
      Header: 'Time',
      accessor: 'time' as const,
      disableFilters: true
    },
    {
      Header: 'Status',
      accessor: 'status' as const,
      canFilter: true
    },
    {
      Header: 'Category',
      Cell: (row: IRowCell<string>) => renderImage(row.cell.value),
      accessor: 'category' as const,
      disableFilters: true
    },
    {
      Header: '',
      Cell: (row: IRowCell<IAction>) => renderActionButton(row.cell.value),
      accessor: 'action' as const,
      disableFilters: true,
      disableSortBy: true
    }
  ], [])

  const tableData = useMemo(() => data ? data?.transactions.map(transaction => ({
    icon: transaction.iconURL,
    type: capitalizeFirstLetter(transaction.type),
    title: transaction.localizableTitle,
    amount: formatAmountWithCurrencyCode(transaction.billingAmount.currency, transaction.billingAmount.amount),
    time: formatTime(transaction.time),
    status: capitalizeFirstLetter(transaction.status),
    category: transaction.categoryIconUrl,
    action: { id: transaction.id, deleted: transaction.deleted }
  })) : [], [])

  function DefaultColumnFilter({ column: { filterValue, preFilteredRows, canFilter, setFilter } }: IDefaultColumnFilter) {
    const count = preFilteredRows.length

    return canFilter ? (
      <StyledFilterInput
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        onClick={e => e.stopPropagation()}
        placeholder={`Filter ${count} transactions`}
      />
    ) : null
  }

  const filterTypes = useMemo(
    () => ({
      text: (rows: Row<Transaction>[], id: string, filterValue: string) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }), []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useSortBy
  )

  return (
    <StyledTransactions>
      <StyledTable {...getTableProps()}>
        <StyledTableHeader>
          {headerGroups.map(headerGroup => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // eslint-disable-next-line react/jsx-key
                <StyledHeaderCell data-tip data-for={column.canSort ? 'header-cell' : null}
                                  {...column.getHeaderProps(column.getSortByToggleProps())} title=''>
                  {column.render('Header')}
                  <StyledSortIconSpan>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <StyledCaretDownIcon />
                        : <StyledCaretUpIcon />
                      : ''}
                  </StyledSortIconSpan>
                  <div>{column.render('Filter')}</div>
                </StyledHeaderCell>
              ))}
            </tr>
          ))}
        </StyledTableHeader>
        <StyledTableBody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            // eslint-disable-next-line react/jsx-key
            <StyledTableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </StyledTableRow>
          )
        })}
        </StyledTableBody>
      </StyledTable>
      <Tooltip id='header-cell' message='Hold shift to sort multiple' />
    </StyledTransactions>
  );
};

const StyledTransactions = styled.div`
  overflow: scroll;
`;

const StyledTable = styled.table`
  width: 100%;
  position: relative;

  td,
  th {
    border: none;
    padding: 8px;
  }

  th {
    border: none;
  }
`;

const StyledTableHeader = styled.thead`
  color: ${({ theme }) => theme.secondaryText};

  th {
    text-align: left;
  }
`;

const StyledHeaderCell = styled.th`
  vertical-align: top;
`

const StyledFilterInput = styled.input`
  margin-top: 4px;
`

const StyledTableBody = styled.tbody`
  > :nth-child(2n+1) {
    background-color: ${({ theme }) => theme.fade1}
  }
`

const StyledTableRow = styled.tr`
  img {
    height: 30px;
  }
`;

const StyledDeleteButton = styled.button`
  background-color: ${({ theme, disabled }) => disabled ? theme.fade3 : theme.button.negative.interactive};
  border: none;
`

const StyledDeleteIcon = styled(Delete)`
  width: 25px;
  height: 25px;
  color: white
`;

const StyledCaret = css`
  width: 17px;
`

const StyledCaretDownIcon = styled(CaretDown)`
  ${StyledCaret}
`

const StyledCaretUpIcon = styled(CaretUp)`
  ${StyledCaret}
`

const StyledSortIconSpan = styled.span`
  ${StyledCaret};
  display: inline-block;
  margin-left: 4px;
`
