<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $department_name = "SELECT department_name FROM ref_departments WHERE ref_departments.id = books.department_id";
        $author_name = "SELECT CONCAT(firstname,' ',lastname)  from `authors` WHERE `authors`.book_id=books.id";

        $data = Books::select([
            "*",
            DB::raw("($department_name) department_name"),
            DB::raw("($author_name) author_name"),

        ]);

        $data = $data->where(function ($query) use ($request) {
            if ($request->search) {
                $query->orWhere(DB::raw("(bookname)"), 'LIKE', "%$request->search%");
            }
        });

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data = $data->orderBy('id', 'desc');
        }

        if ($request->page_size) {
            $data = $data->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page)
                ->toArray();
        } else {
            $data = $data->get();
        }

        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret = [
            "success" => true,
            "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
        ];

        $request->validate([
            'bookname' => [
                'required',
                Rule::unique('books')->ignore($request->id),
            ],

        ]);

        $bookInfo = [
            "department_id" => $request->department_id,
            "bookname" => $request->bookname,
            "datepublish" => date('F Y', strtotime($request->datepublish)),
            "type" => $request->type,
            "university" => $request->university,
            // "attachment_id" => $request->attachment_id,
        ];

        $createBook = Books::create($bookInfo);

        $book_id = $createBook->id;

        $author_list = $request->author_list;

        if ($book_id != "") {

            if (!empty($author_list)) {
                foreach ($author_list as $key => $value) {
                    if (!empty($value['id'])) {
                        $finddAuthor = \App\Models\Author::where('id', $value['id'])->first();

                        if ($finddAuthor) {
                            $finddAuthor->fill([
                                "book_id" => $createBook->id,

                                "firstname" => $value['firstname'] ?? null,
                                "middlename" => $value['middlename'] ?? null,
                                "lastname" => $value['lastname'] ?? null,
                                "suffix" => $value['suffix'] ?? null,
                                "role" => $value['role'] ?? null,
                                // "course" => $value['course'] ?? null,
                            ])->save();
                        }
                    } else {
                        \App\Models\Author::create([
                            "book_id" => $createBook->id,

                            "firstname" => $value['firstname'] ?? null,
                            "middlename" => $value['middlename'] ?? null,
                            "lastname" => $value['lastname'] ?? null,
                            "suffix" => $value['suffix'] ?? null,
                            "role" => $value['role'] ?? null,
                            // "course" => $value['course'] ?? null,
                        ]);
                    }
                }
            }
        }

        $ret += [
            "request" => $request->all()
        ];

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function show(Books $books)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Books $books)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function destroy(Books $books)
    {
        //
    }
}
