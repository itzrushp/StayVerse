
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInDialog = ({ isOpen, onClose }: SignInDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <SignInForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterDialog = ({ isOpen, onClose }: RegisterDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
        </DialogHeader>
        <RegisterForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
