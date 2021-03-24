import * as React from 'react';
import { TransactionsQueryData, useTransactionsQuery } from '../../hooks/transactions/get_transactions';
import { TransactionsList } from './components/TransactionsList'
import ConditionalRender from "../../components/CoditionalRender";
import styled from "styled-components";

interface TransactionsProps {
  userId: string;
}

export const Transactions = ({ userId }: TransactionsProps) => {
  const { data, loading, error } = useTransactionsQuery({
    variables: {
      userId,
    },
  });

  return (
    <StyledCard>
      <ConditionalRender dataArray={[data]} loadingArray={[loading]} errorArray={[error]}
                         errorMessage={error?.message ?? 'An error occurred'}>
        {([transactionsData]: TransactionsQueryData[]) => (
          <TransactionsList data={transactionsData} />
        )}
      </ConditionalRender>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 32px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 24px;
  flex: 1 0 auto;
`;
