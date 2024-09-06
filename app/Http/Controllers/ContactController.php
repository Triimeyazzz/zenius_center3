<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::to('raifanramadhanputra06@gmail.com')->send(new ContactMail($request->name, $request->email, $request->message));

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
