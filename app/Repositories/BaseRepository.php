<?php

namespace App\Repositories;

abstract class BaseRepository
{
    protected $model;

    public function total()
    {
        return $this->model::query()->get();
    }

    public function create($data)
    {
        return $this->model::query()->create($data);
    }

    public function find(int $id)
    {
        return $this->model::query()->find($id);
    }

    public function findmany(array $ids)
    {
        return $this->model::query()->findmany($ids);
    }

    public function findByField($parent)
    {
        return $this->model::query()->where('id', $parent)->value('title');
    }

    public function selectColumn($col1, $col2)
    {
        return $this->model::query()->select("$col1", "$col2")->get();
    }

    public function remove($id)
    {
        return $this->model::query()->where('id', $id)->delete();
    }

    public function update($id, $data)
    {
        return $this->model::query()->where('id', $id)->update($data);
    }
}
