import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationDialogProps {
  title: string;
  children?: React.ReactNode;
  hideDefaultActions?: boolean;
  extraActions?: React.ReactNode;
  description?: string;
  open: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const { title, children, description, open, primaryActionText, secondaryActionText, onClose, onConfirm } = props;

  return (
    <Dialog open={open} onOpenChange={onClose} aria-labelledby="confirmation-dialog-title">
      <DialogContent>
        <DialogTitle id="confirmation-dialog-title" className="text-xl font-semibold">
          {title}
        </DialogTitle>
        {description && <DialogDescription className="text-gray-700">{description}</DialogDescription>}
        {children}
        <div className="flex justify-between space-x-4 mt-4">
          <Button onClick={onClose} variant="outline" className="px-4 py-2 text-gray-600 border rounded-md">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
