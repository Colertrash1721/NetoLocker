'use client'
import React from 'react'
import Swal from 'sweetalert2'
import { updatePassword } from '@/services/auth/updatePassword'

export default function UpdatePass() {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const changePass = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cambiar tu contraseña?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiarla',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            const { value: oldPass } = await Swal.fire({
                title: 'Contraseña actual',
                input: 'password',
                inputLabel: 'Ingresa tu contraseña actual',
                inputPlaceholder: 'Contraseña actual',
                inputAttributes: {
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true
            });

            if (!oldPass) return;

            const { value: newPassAndConfirm } = await Swal.fire({
                title: 'Nueva contraseña',
                html: `
          <input id="swal-input1" type="password" class="swal2-input" placeholder="Nueva contraseña">
          <input id="swal-input2" type="password" class="swal2-input" placeholder="Confirmar nueva contraseña">
        `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                preConfirm: () => {
                    const newPass = (document.getElementById('swal-input1') as HTMLInputElement).value;
                    const confirmPass = (document.getElementById('swal-input2') as HTMLInputElement).value;

                    if (!newPass || !confirmPass) {
                        Swal.showValidationMessage('Debes llenar ambos campos');
                        return false;
                    }

                    if (newPass !== confirmPass) {
                        Swal.showValidationMessage('Las contraseñas no coinciden');
                        return false;
                    }

                    return [newPass, confirmPass];
                }
            });

            if (!newPassAndConfirm) return;

            const [newPass, confirmPass] = newPassAndConfirm;

            setOldPassword(oldPass);
            setNewPassword(newPass);
            setConfirmPassword(confirmPass);

            const username = localStorage.getItem('username');
            if (!username) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontró el nombre de usuario.',
                });
                return;
            }
            try {
                const response = await updatePassword(username, oldPass, newPass);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Contraseña actualizada',
                        text: 'Tu contraseña ha sido actualizada correctamente.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: response.message || 'Ocurrió un error al actualizar la contraseña.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la contraseña. Inténtalo de nuevo más tarde.',
                });
            }
        }
    };

    return changePass;
}
