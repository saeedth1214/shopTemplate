<?php

namespace App\Services;

class Card
{
    const NAME = 'card';
    const TIME = 24 * 60 * 3600;

    public static function add($id, $count)
    {
        $data = self::items();
        $data[$id] = ($data[$id] ?? 0) + $count;
        self::save($data);
    }

    public static function items()
    {
        return (empty($_COOKIE[self::NAME]) ? array() : unserialize($_COOKIE[self::NAME]));
    }

    public static function save($data)
    {
        setcookie(self::NAME, serialize($data), time() + self::TIME, '/');
    }

    public static function remove($id)
    {
        if (!(empty($_COOKIE[self::NAME]))) {
            $data = self::items();
            unset($data[$id]);
            self::save($data);
        }
    }

    public static function update($pid, $count)
    {
        $data = self::items();
        $data[$pid] = $count;
        self::save($data);
    }


    public static function sizeOf()
    {
        return count(self::items());
    }

    public static function itemsIds()
    {
        return array_keys(self::items());
    }

    public static function clear()
    {
        unset($_COOKIE[self::NAME]);
        setcookie(self::NAME, '', time() - 3600);
    }

    public static function total_items()
    {
        $items = 0;
        foreach (self::items() as $id => $count) {
            $items += $count;
        }
        return $items;
    }
}