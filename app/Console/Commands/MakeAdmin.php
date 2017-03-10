<?php

namespace App\Console\Commands;

use App\User;
use App\Role;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin {username} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new administrator';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $username = $this->argument('username');
        $password = Hash::make($this->argument('password'));

        if(User::where('username', '=', $username)->exists()){
            $this->line("Erreur: L'utilisateur $username existe déjà.");
        }else{

            if(Role::where('name', '=', 'administrator')->exists()){
                $adminRole = Role::where('name', '=', 'administrator')->first();
            }else{
                $adminRole = new Role;
                $adminRole->name = "administrator";
                $adminRole->save();
            }
            $user = new User;
            $user->username = $username;
            $user->password = $password;
            $user->role()->associate($adminRole);
            $user->save();
            $this->line("L'administrateur $username a bien été créé.");
        }

    }
}
