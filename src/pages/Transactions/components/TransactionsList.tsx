import * as React from 'react';
import styled from 'styled-components';
import { TransactionsQueryData } from "../../../hooks/transactions/get_transactions";

interface TransactionsProps {
  data?: TransactionsQueryData
}

export const TransactionsList = ({ data }: TransactionsProps) => {
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
          <StyledTransaction key={transaction.id}>
            <td>
              <img src={transaction.iconURL} />
            </td>
            <td>{transaction.type}</td>
            <td>{transaction.localizableTitle}</td>
            <td>{transaction.billingAmount.amount}</td>
            <td>{transaction.time}</td>
            <td>{transaction.status}</td>
            <td>
              <img src={transaction.categoryIconUrl} />
            </td>
          </StyledTransaction>
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

const StyledTransaction = styled.tr`
  img {
    height: 30px;
  }
`;
