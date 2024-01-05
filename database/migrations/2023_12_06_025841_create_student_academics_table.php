<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAcademicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_academics', function (Blueprint $table) {
            $table->id();

            $table->integer('profile_id')->nullable();

            // FOR TRANSFEREE
            $table->string('student_status')->nullable();
            $table->string('previous_school')->nullable();
            $table->string('were_accepted')->nullable(); //applied to FSUU before? yes or no
            $table->date('year_applied')->nullable(); //year applied to FSUU
            $table->string('did_attend')->nullable(); //did attend FSUU? yes or no

            $table->date('year_attended')->nullable(); //year attended previous school and/or FSUU

            // FOR 2ND DEGREE
            $table->string('intend_to_pursue')->nullable(); //Graduate || Baccalaureate || Law || Tech-Voc
            $table->string('working_student')->nullable(); //yes or no
            $table->string('employer_name')->nullable(); //if yes, details
            $table->string('employer_address')->nullable();

            // Additional Information
            $table->string('heard_about_fsuu')->nullable(); //yes or no
            $table->string('decision_influence')->nullable(); //if yes, details
            $table->string('decision_factors')->nullable();

            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->integer('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_academics');
    }
}
