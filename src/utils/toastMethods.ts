import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  type: 'success',
  position: 'bottom-left',
  autoClose: 5000,
  pauseOnHover: true,
  pauseOnFocusLoss: false
}

export default function getToast (message: string, options?: ToastOptions) {
  toast(message, {...defaultOptions, ...options})
}
