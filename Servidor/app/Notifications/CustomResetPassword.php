<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends ResetPassword
{
    /**
     * Build the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000'); // Adjust as needed

        $resetUrl = "{$frontendUrl}/new-password?token={$this->token}&email=" . urlencode($notifiable->getEmailForPasswordReset());

        return (new MailMessage)
            ->subject('Reseteja la teva contrasenya')
            ->line('Estàs rebent aquest correu perquè vam rebre una sol·licitud de restabliment de contrasenya per al teu compte.')
            ->action('Restableix la contrasenya', $resetUrl)
            ->line('Si no vas sol·licitar un restabliment de contrasenya, no cal fer res més.');
    }
}
