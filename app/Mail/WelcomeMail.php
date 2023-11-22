<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Persona;


class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;
    public $persona;
    public $contraseñaSinCifrar;
    /**
     * Create a new message instance.
     */
    public function __construct(Persona $persona, $contraseñaSinCifrar)
    {
        $this->persona = $persona;
        $this->contraseñaSinCifrar = $contraseñaSinCifrar;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->view('emails.welcome')
        ->with(['usuario' => $this->persona->Usuario, 'contraseña' => $this->contraseñaSinCifrar]);
    }
}