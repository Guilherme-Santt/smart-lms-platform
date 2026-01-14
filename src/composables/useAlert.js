import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'grey',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})

export function useToast() {
    return (message, icon = 'warning') => {
        return Toast.fire({
            icon: icon,
            title: message,
        })
    }
}