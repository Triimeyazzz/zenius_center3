<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiswaMessageController extends Controller
{
    public function index()
    {
        $siswa = Auth::guard('siswa')->user();
        $messages = Message::where(function ($query) use ($siswa) {
                $query->where('receiver_id', $siswa->id)
                      ->where('receiver_type', Siswa::class);
            })
            ->orWhere(function ($query) use ($siswa) {
                $query->where('sender_id', $siswa->id)
                      ->where('sender_type', Siswa::class);
            })
            ->with('sender', 'receiver')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($message) use ($siswa) {
                $isOutgoing = $message->sender_id == $siswa->id && $message->sender_type == Siswa::class;
                return [
                    'id' => $message->id,
                    'sender_name' => $isOutgoing ? 'You' : ($message->sender->name ?? $message->sender->nama),
                    'receiver_name' => $isOutgoing ? ($message->receiver->name ?? $message->receiver->nama) : 'You',
                    'message' => $message->message,
                    'attachment' => $message->attachment ? asset('storage/' . $message->attachment) : null,
                    'created_at' => $message->created_at->format('Y-m-d H:i:s'),
                    'is_outgoing' => $isOutgoing,
                ];
            });

        $admins = User::where('role', 'admin')->get();

        return Inertia::render('Siswa/Messages/Index', [
            'messages' => $messages,
            'admins' => $admins,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|exists:users,id',
            'message' => 'required|string',
            'attachment' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048'
        ]);

        $sender = Auth::guard('siswa')->user();
        $receiver = User::findOrFail($request->admin_id);

        if ($receiver->role !== 'admin') {
            return back()->with('error', 'You can only send messages to admins.');
        }

        $message = new Message();
        $message->sender_id = $sender->id;
        $message->sender_type = Siswa::class;
        $message->receiver_id = $receiver->id;
        $message->receiver_type = User::class;
        $message->message = $request->message;

        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('attachments', 'public');
            $message->attachment = $attachmentPath;
        }

        $message->save();

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}