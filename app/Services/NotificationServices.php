<?php

namespace App\Services;

use App\Models\Notification;

class NotificationServices
{
    public function sendNotification(
        $sender_id,
        string $type,
        string $title,
        string $message,
        string $user_id,
        $link = ''
    ) {
        // save ke database
        $notification = Notification::create([
            'user_id'   => $user_id,
            'sender_id' => $sender_id,
            'title'     => $title,
            'type'      => $type,
            'message'   => $message,
            'url'       => $link
        ]);


        return $notification;
    }

    public function getData($user_id, $orderBy, $orderDirection, $perPage, $type, $isRead)
    {
        $data = Notification::query()
            ->with(['sender']);

        if ($user_id) {
            $data->where(function ($query) use ($user_id) {
                $query->whereUserId($user_id);
            });
        }

        if ($type) {
            $data->where(function ($query) use ($type) {
                $query->whereType($type);
            });
        }

        if ($isRead == "true") {
            $data->where(function ($query) {
                $query->where("read_at", "!=", null);
            });
        } elseif ($isRead == "false") {
            $data->where(function ($query) {
                $query->where("read_at", null);
            });
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->paginate($perPage ?? 10)
            ->withQueryString();
    }

    public function getDataById(string $id)
    {
        return Notification::find($id);
    }

    public function readNotification(string $id)
    {
        try {
            // baca data
            $notification = $this->getDataById($id);

            $notification->update([
                'read_at' => date('Y-m-d H:i:s')
            ]);

            return responseSuccess("Berhasil, notifikasi telah dibaca", $notification);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function readAllNotification(string $user_id)
    {
        try {
            $notification = Notification::whereUserId($user_id)->update([
                'read_at' => date('Y-m-d')
            ]);

            return responseSuccess("Berhasil, notifikasi telah dibaca semua", $notification);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }
}
