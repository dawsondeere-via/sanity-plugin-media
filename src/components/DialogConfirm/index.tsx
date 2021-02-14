import {WarningOutlineIcon} from '@sanity/icons'
import {Box, Button, Dialog, Flex, Stack, Text} from '@sanity/ui'
import {DialogConfirm} from '@types'
import React, {FC, ReactNode} from 'react'
import {useDispatch} from 'react-redux'

import {remove} from '../../modules/dialog'

type Props = {
  children?: ReactNode
  dialog: DialogConfirm
}

const DialogConfirm: FC<Props> = (props: Props) => {
  const {children, dialog} = props

  // Redux
  const dispatch = useDispatch()

  // Callbacks
  const handleClose = () => {
    dispatch(remove({id: dialog?.id}))
  }

  const handleConfirm = () => {
    // Close target dialog, if provided
    if (dialog?.closeDialogId) {
      dispatch(remove({id: dialog?.closeDialogId}))
    }

    if (dialog?.confirmCallbackAction) {
      dispatch(dialog.confirmCallbackAction)
    }

    // Close self
    handleClose()
  }

  const Footer = () => (
    <Box padding={3}>
      <Flex justify="space-between">
        <Button fontSize={1} mode="bleed" onClick={handleClose} text="Cancel" />
        <Button
          fontSize={1}
          onClick={handleConfirm}
          text={dialog?.confirmText}
          tone={dialog?.tone}
        />
      </Flex>
    </Box>
  )

  const Header = () => (
    <Flex align="center">
      <Box paddingX={1}>
        <WarningOutlineIcon />
      </Box>
      <Box marginLeft={2}>{dialog?.headerTitle}</Box>
    </Flex>
  )

  return (
    <Dialog
      footer={<Footer />}
      header={<Header />}
      id="confirm"
      onClose={handleClose}
      scheme="dark"
      width={1}
    >
      <Box paddingX={4} paddingY={4}>
        <Stack space={3}>
          {dialog?.title && <Text size={1}>{dialog.title}</Text>}
          {dialog?.description && (
            <Text muted size={1}>
              <em>{dialog.description}</em>
            </Text>
          )}
        </Stack>
      </Box>

      {children}
    </Dialog>
  )
}

export default DialogConfirm
