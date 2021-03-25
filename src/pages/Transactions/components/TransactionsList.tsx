import * as React from 'react';
import styled from 'styled-components';
import { TransactionsQueryData } from '../../../hooks/transactions/get_transactions';
import { TransactionsListItem } from './TransactionListItem';

interface IProps {
  data?: TransactionsQueryData
  handleDeletion: (id: string) => void
}

export const TransactionsList = ({ data, handleDeletion }: IProps) => {
  return (
    <StyledTransactions>
      <StyledTable>
        <StyledTableHeader>
          <tr>
            <th>Icon</th>
            <th>Type</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Time</th>
            <th>Status</th>
            <th>Category</th>
          </tr>
        </StyledTableHeader>
        <tbody>
        {data?.transactions.map(transaction => (
          <TransactionsListItem key={transaction.id} transaction={transaction} handleDeletion={handleDeletion} />
        ))}
        </tbody>
      </StyledTable>
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

