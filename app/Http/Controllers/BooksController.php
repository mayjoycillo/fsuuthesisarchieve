<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx\Rels;

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
        $year_publish = "DATE_FORMAT(datepublish, '%M %Y')";


        $data = Books::select([
            "*",
            DB::raw("($department_name) department_name"),
            DB::raw("($year_publish) year_publish_formatted")

        ])
            ->with([
                'authors' => function ($query) {
                    $query->with(['profile'])->orderBy("id", "desc");
                },
                "attachments" => function ($query) {
                    $query->orderBy("id", "desc");
                }
            ]);

        $data->where(function ($query) use ($request, $department_name) {
            if ($request->search) {
                $query->orWhere(DB::raw("($department_name)"), 'LIKE', "%$request->search%");
                $query->orWhere("bookname", 'LIKE', "%$request->search%");
            }
        });

        if ($request->year_range) {
            $year_range = explode(",", $request->year_range);

            $data->whereYear("datepublish", ">=", $year_range[0]);
            $data->whereYear("datepublish", "<=", $year_range[1]);
        }

        if ($request->department_id) {
            $data->where("department_id",    $request->department_id);
        }

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data->orderBy('id', 'desc');
        }

        if ($request->page_size) {
            $data = $data->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page)
                ->toArray();

            $data["data"] = collect($data['data'])->map(function ($value) {
                $value['attachments'] = collect($value['attachments'])->map(function ($value) {
                    $pdf_file = base64_encode(file_get_contents($value['file_path']));

                    $value['pdf_file'] = "data:application/pdf;base64," . $pdf_file;
                    return $value;
                });

                return $value;
            });
        } else {
            $data = $data->get();
        }

        // return Books::all();

        return response()->json([
            'success'   => true,
            'data'      => $data,
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
            "success" => false,
            "message" => "Data not " . ($request->id ? "updated" : "created"),
            "request" => $request->all()
        ];

        $request->validate([
            'bookname' => [
                'required',
                Rule::unique('books')->ignore($request->id),
            ],

            // 'file' => 'required|mimes:pdf|max:2048', // Max file size: 2MB

        ]);



        $bookInfo = [
            "department_id" => $request->department_id,
            "bookname" => $request->bookname,
            "datepublish" => $request->datepublish,
            "type" => $request->type,
            "university" => $request->university,
            // "attachment_id" => $request->attachment_id,
        ];

        $findBook = Books::updateOrCreate([
            'id' => $request->id ? $request->id : null
        ], $bookInfo);


        $author_list = $request->author_list;

        if ($findBook) {
            if ($request->hasFile('pdf_file')) {
                $this->create_attachment($findBook, $request->file("pdf_file"), [
                    "folder_name" => "books",
                    "file_type" => "document",
                    "file_description" => "Books Attachments"
                ]);
            }

            if (!empty($author_list)) {
                foreach ($author_list as $key => $value) {
                    if (!empty($value['id'])) {
                        $findAuthor = \App\Models\Author::find($value['id']);

                        if ($findAuthor) {
                            $findProfile = \App\Models\Profile::find($findAuthor->profile_id);

                            if ($findProfile) {
                                $findProfile->update([
                                    "firstname" => $value['firstname'] ?? null,
                                    "middlename" => $value['middlename'] ?? null,
                                    "lastname" => $value['lastname'] ?? null,
                                    "suffix" => $value['suffix'] ?? null,
                                    "role" => $value['role'] ?? null,
                                    "course" => $value['course'] ?? null,
                                    "school_id" => $value['school_id'] ?? null,
                                    "contact" => $value['contact'] ?? null,
                                ]);
                            }
                        }
                    } else {
                        $email = $value['email'];

                        $user_id = null;

                        $checkUserName = \App\Models\User::where("username", $email)->first();
                        $checkEmail = \App\Models\User::where("email", $email)->first();

                        if ($checkUserName) {
                            $user_id = $checkUserName->id;
                        }
                        if ($checkEmail) {
                            $user_id = $checkEmail->id;
                        }

                        if (!$user_id) {
                            $createUser = \App\Models\User::create([
                                "username" => $email,
                                "email" => $email,
                                "password" => Hash::make($value['lastname']),
                                "user_role_id" => 4,
                                "status" => "Active"
                            ]);

                            if ($createUser) {
                                $user_id = $createUser->id;
                            }
                        }

                        if ($user_id) {
                            $findProfilebyId = \App\Models\Profile::where('user_id', $user_id)->first();

                            if ($findProfilebyId) {
                                $findProfilebyId->fill([
                                    "firstname" => $value['firstname'] ?? null,
                                    "middlename" => $value['middlename'] ?? null,
                                    "lastname" => $value['lastname'] ?? null,
                                    "suffix" => $value['suffix'] ?? null,
                                    "role" => $value['role'] ?? null,
                                    "course" => $value['course'] ?? null,
                                    "school_id" => $value['school_id'] ?? null,
                                    "contact" => $value['contact'] ?? null,

                                ])->save();
                            } else {
                                $createAuthor = \App\Models\Profile::create([
                                    "user_id" => $user_id,
                                    "firstname" => $value['firstname'] ?? null,
                                    "middlename" => $value['middlename'] ?? null,
                                    "lastname" => $value['lastname'] ?? null,
                                    "suffix" => $value['suffix'] ?? null,
                                    "role" => $value['role'] ?? null,
                                    "course" => $value['course'] ?? null,
                                    "school_id" => $value['school_id'] ?? null,
                                    "contact" => $value['contact'] ?? null,
                                ]);

                                if ($createAuthor) {
                                    \App\Models\Author::create([
                                        "book_id" =>  $findBook->id,
                                        "profile_id" => $createAuthor->id,
                                    ]);
                                }
                            }
                        }
                    }
                }
            }

            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
                "request" => $request->all()
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Books::with([
            // 'profiles',
            'authors.profile',
            'ref_departments'
        ])->find($id);

        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
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


    public function update_book(Request $request)
    {
        $ret = [
            "success" => true,
            "message" => "Data updated successfully",
            "request" => $request->all()
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
            "datepublish" => $request->datepublish,
            "type" => $request->type,
            "university" => $request->university,
            // "attachment_id" => $request->attachment_id,
        ];

        $findBook = Books::updateOrCreate([
            'id' => $request->id
        ], $bookInfo);

        $author_list = $request->author_list;

        if ($findBook) {
            if (!empty($author_list)) {
                foreach ($author_list as $key => $value) {
                    if (!empty($value['id'])) {
                        $findAuthor = \App\Models\Author::find($value['id']);

                        if ($findAuthor) {
                            $findProfile = \App\Models\Profile::find($findAuthor->profile_id);

                            if ($findProfile) {
                                $findProfile->update([
                                    "firstname" => $value['firstname'] ?? null,
                                    "middlename" => $value['middlename'] ?? null,
                                    "lastname" => $value['lastname'] ?? null,
                                    "suffix" => $value['suffix'] ?? null,
                                    "role" => $value['role'] ?? null,
                                    "course" => $value['course'] ?? null,
                                    "school_id" => $value['school_id'] ?? null,
                                    "contact" => $value['contact'] ?? null,
                                ]);
                            }
                        }
                    } else {
                        $email = $value['email'];

                        $user_id = null;

                        $checkUserName = \App\Models\User::where("username", $email)->first();
                        $checkEmail = \App\Models\User::where("email", $email)->first();

                        if ($checkUserName) {
                            $user_id = $checkUserName->id;
                        }
                        if ($checkEmail) {
                            $user_id = $checkEmail->id;
                        }

                        if (!$user_id) {
                            $createUser = \App\Models\User::create([
                                "username" => $email,
                                "email" => $email,
                                "password" => Hash::make($value['lastname']),
                                "user_role_id" => 4,
                                "status" => "Active"
                            ]);

                            if ($createUser) {
                                $user_id = $createUser->id;
                            }
                        }

                        if ($user_id) {
                            $findProfilebyId = \App\Models\Profile::where('user_id', $user_id)->first();

                            if ($findProfilebyId) {
                                $findProfilebyId->fill([
                                    "firstname" => $value['firstname'] ?? null,
                                    "middlename" => $value['middlename'] ?? null,
                                    "lastname" => $value['lastname'] ?? null,
                                    "suffix" => $value['suffix'] ?? null,
                                    "role" => $value['role'] ?? null,
                                    "course" => $value['course'] ?? null,
                                    "school_id" => $value['school_id'] ?? null,
                                    "contact" => $value['contact'] ?? null,

                                ])->save();
                            } else {
                                $createAuthor = \App\Models\Profile::create([
                                    "user_id" => $user_id,
                                    "firstname" => $value['firstname'] ?? null,
                                    "middlename" => $value['middlename'] ?? null,
                                    "lastname" => $value['lastname'] ?? null,
                                    "suffix" => $value['suffix'] ?? null,
                                    "role" => $value['role'] ?? null,
                                    "course" => $value['course'] ?? null,
                                    "school_id" => $value['school_id'] ?? null,
                                    "contact" => $value['contact'] ?? null,
                                ]);

                                if ($createAuthor) {
                                    \App\Models\Author::create([
                                        "book_id" =>  $findBook->id,
                                        "profile_id" => $createAuthor->id,
                                    ]);
                                }
                            }
                        }
                    }
                }
            }
        }


        return response()->json($ret, 200);
    }
}
