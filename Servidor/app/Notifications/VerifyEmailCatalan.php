<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class VerifyEmailCatalan extends VerifyEmail
{
    /**
     * Get the verification URL for the given notifiable.
     */
    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verification.verify', 
            Carbon::now()->addMinutes(60),
            ['id' => $notifiable->getKey(), 'hash' => sha1($notifiable->getEmailForVerification())]
        );
    }

    /**
     * Build the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verifica la teva adreça de correu electrònic')
            ->line('Hola! Si has creat un compte a la nostra aplicació, si us plau, verifica la teva adreça de correu electrònic fent clic al següent enllaç:')
            ->action('Verifica el teu correu electrònic', $verificationUrl)
            ->line('Si no has sol·licitat aquest correu, ignora aquest missatge.')
            ->salutation('Gràcies per utilitzar la nostra aplicació!');
    }
}
