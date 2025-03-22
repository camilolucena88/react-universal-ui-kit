"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../lib/utils"

interface CustomModalProps {
  containerId: string
  title: string | React.ReactNode
  description: string | React.ReactNode
  footer: string | React.ReactNode
  className?: string
}

export function CustomModal({ containerId, title, description, footer, className }: CustomModalProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const modalElement = document.getElementById(containerId)
    if (!modalElement) return

    const updateState = () => {
      const isOpenNow = modalElement.getAttribute("data-open") === "true"
      setOpen(isOpenNow)
    }

    const observer = new MutationObserver(updateState)
    observer.observe(modalElement, { attributes: true, attributeFilter: ["data-open"] })
    updateState()

    return () => observer.disconnect()
  }, [containerId])

  const handleClose = () => {
    const modalElement = document.getElementById(containerId)
    if (modalElement) {
      modalElement.setAttribute("data-open", "false")
    }
    setOpen(false)
  }

  // Function to safely render HTML content
  const renderContent = (content: string | React.ReactNode) => {
    if (typeof content === "string") {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }
    return content
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className={cn("sm:max-w-[625px] max-h-[630px] overflow-auto", className)}>
        <DialogHeader>
          <DialogTitle className="DialogTitle">{renderContent(title)}</DialogTitle>
        </DialogHeader>
           {renderContent(description)}
        <DialogFooter className="sm:justify-between">
          {renderContent(footer)}
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

