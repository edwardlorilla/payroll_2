<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
            ->paginate());
    }

    public function create()
    {
        $roles = \App\Role::with('permissions')->get();
        $jobs = \App\Job::all();
        return response()->json(['roles' => $roles, 'jobs' => $jobs], 200);
    }

    public function store(Request $request)
    {
        $input = $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->id,
            'password' => 'string|min:6',
            'job_id' => 'required',
            'confirm_password' => 'same:password',
            'roles' => '',
        ]);
        if (trim($request->password) == '') {
            $input = $request->except('password');
        } else {
            $input['password'] = bcrypt($request->password);
        }
        $model = User::updateOrCreate(
            ['id' => $request->id],
            $input);
        if ($request->roles) {
            $model->syncRoles($input['roles']);


        }
        return response()->json($model, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $roles = \App\Role::all();
        $permissions = \App\Permission::all();
        $jobs = \App\Job::all();
        return response()->json(['user' => User::where('id', $user->id)->with('roles', 'permissions')->first()->makeHidden(['job', 'attendances']), 'roles' => $roles, 'permissions' => $permissions, 'jobs' => $jobs], 200);
    }

    public function attendances(User $user)
    {
        $currentMonth = date('m');
        $attendanceFunction = function ($query) use ($currentMonth){
            $query->whereMonth('started_at', $currentMonth);
        };
        $attendance = User::whereId($user->id)->with(['attendances' => $attendanceFunction])->whereHas('attendances', $attendanceFunction)->first();

        return response()->json($attendance ? $attendance->makeHidden([ 'can', 'job_id', 'roles']) : []);
    }
    public function edit(User $user)
    {
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->validate($request, [
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        ]);
        $data = $request->all();
        if (!Hash::check($data['old_password'], $user->password)) {
            return response()->json('The specified password does not match the database password', 500);
        } else {
            return response()->json($user->update(['password' => bcrypt($request->new_password)]), 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
