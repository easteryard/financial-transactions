import * as React from 'react';
import { TransactionsQueryData, useTransactionsQuery } from '../../hooks/transactions/get_transactions';
import { TransactionsList } from './components/TransactionsList'
import ConditionalRender from '../../components/CoditionalRender';
import styled, { useTheme } from 'styled-components';
import { useDeleteAuthorizationMutation } from '../../hooks/transactions/delete_authorization';
import { toast } from 'react-toastify';
import Dialog from '../../components/Dialog';
import { useState } from 'react';
import useUserToken from '../../hooks/useUserToken';

export const Transactions = () => {
  const { userId } = useUserToken()
  const [selectedTransactionId, setSelectedTransactionId] = useState('')
  const theme = useTheme()
  const { data, loading, error } = useTransactionsQuery({
    variables: {
      userId
    }
  })
  const [deleteAuthorizationMutation] = useDeleteAuthorizationMutation()

  function handleSelectTransaction (id: string) {
    setSelectedTransactionId(id)
  }

  function handleDeletion () {
    deleteAuthorizationMutation({ variables: { transactionId: selectedTransactionId } })
      .then(() => {
        toast.success('The transaction has been deleted',
          {
            position: 'bottom-left',
            autoClose: 5000,
            pauseOnHover: true
          })
      })
      .catch(() => {
        toast.error('An error occurred during deletion', {
          position: 'bottom-left',
          autoClose: 5000,
          pauseOnHover: true
        })
      })
    setSelectedTransactionId('')
  }

  function handleDialogClose () {
    setSelectedTransactionId('')
  }

  return (
    <StyledCard>
      <ConditionalRender dataArray={[data]} loadingArray={[loading]} errorArray={[error]}
                         errorMessage={error?.message ?? 'An error occurred'}>
        {([transactionsData]: TransactionsQueryData[]) => (
          <TransactionsList data={transactionsData} handleDeletion={handleSelectTransaction} />
        )}
      </ConditionalRender>
      <Dialog isOpen={!!selectedTransactionId} dialogText='Do you wish to delete the transaction?' confirmText='Delete'
              onConfirm={handleDeletion} onCancel={handleDialogClose} confirmColor={theme.button.negative.interactive} />
    </StyledCard>
  )
}

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 32px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 24px;
  flex: 1 0 auto;
`;
